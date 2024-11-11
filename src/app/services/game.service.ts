import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Upgrade } from '../interfaces/upgrade';
import { UPGRADES, CLICK_UPGRADES, DEFENSES, ATTACKS } from '../config/config';
import { Defense } from '../interfaces/defense';
import { LogService } from './log.service';
import { Attack } from '../interfaces/attack';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public points = 0;
  public totalPoints = 0;
  public pointsPerClick = 15555555;
  public pointsPerSecond = 0;
  public defensePoints = 0;
  private firstClick = true;
  
  upgrades: Upgrade[] = UPGRADES;
  defenses: Defense[] = DEFENSES;
  clickUpgrades: Upgrade[] = CLICK_UPGRADES;
  activeDefenses: Defense[] = []; 

  points$ = new BehaviorSubject<number>(this.points);
  defensePoints$ = new BehaviorSubject<number>(this.defensePoints);
  totalPoints$ = new BehaviorSubject<number>(this.totalPoints);
  pointsPerClick$ = new BehaviorSubject<number>(this.pointsPerClick);
  pointsPerSecond$ = new BehaviorSubject<number>(this.pointsPerSecond);
  upgrades$ = new BehaviorSubject<Upgrade[]>(this.upgrades);
  clickUpgrades$ = new BehaviorSubject<Upgrade[]>(this.clickUpgrades);
  defenses$ = new BehaviorSubject<Defense[]>(this.defenses);
  achievements$ = new BehaviorSubject<Upgrade[]>([]);

  public currentClickUpgrade$ = new BehaviorSubject<Upgrade[]>([]);
  public currentDefenses$ = new BehaviorSubject<Defense[]>(this.activeDefenses);
  public attackEvent$ = new Subject<Attack>();

  constructor(private _logService: LogService) {
    this._logService.addLog(`Welcome to Drug Lord Clicker.`);
    this._logService.addLog(`Make your first deal and expand your empire!`);
    setInterval(() => {
      this.incrementPoints(this.pointsPerSecond);
    }, 1000);
  }

  incrementPoints(points: number) {
    const incrementInterval = 1000 / points;
    let pointsToAdd = points;

    const intervalId = setInterval(() => {
      if (pointsToAdd > 0) {
        this.points += 1;
        this.totalPoints += 1;
        this.points$.next(this.points);
        this.totalPoints$.next(this.totalPoints);
        pointsToAdd -= 1;
      } else {
        clearInterval(intervalId);
      }
    }, incrementInterval);
  }

  addPoints(points: number) {
    this.points += points;
    this.totalPoints += points;
    this.points$.next(this.points);
    this.totalPoints$.next(this.totalPoints);
  }

  click() {
    if (this.firstClick) {
      this._logService.addLog(`Achievement unlocked: My first $deal!`, 'achievement');
      this.firstClick = false;
    }
    this.addPoints(this.pointsPerClick);
  }

  buyUpgrade(upgradeId: number) {
    const upgrade = this.upgrades.find(u => u.id === upgradeId);
    if (upgrade && this.points >= upgrade.cost) {
      this.points -= upgrade.cost;
      this.pointsPerSecond += upgrade.pointsIncrease;
      upgrade.count += 1;
      this._logService.addLog(`You bought a ${upgrade.name} for $${upgrade.cost}.`);
      upgrade.cost = Math.floor(upgrade.cost * upgrade.costIncrease);

      this.points$.next(this.points);
      this.pointsPerSecond$.next(this.pointsPerSecond);
      this.upgrades$.next(this.upgrades);

      this.addAchievement(upgrade);
    }
  }

  buyClickUpgrade(upgradeId: number) {
    const upgrade = this.clickUpgrades.find(u => u.id === upgradeId);
    if (upgrade && this.points >= upgrade.cost) {
      this.points -= upgrade.cost;
      this.pointsPerClick += upgrade.pointsIncrease;
      upgrade.count += 1;
      this._logService.addLog(`You bought a ${upgrade.name} for $${upgrade.cost}.`);
      upgrade.cost = Math.floor(upgrade.cost * upgrade.costIncrease);

      this.points$.next(this.points);
      this.pointsPerClick$.next(this.pointsPerClick);
      this.clickUpgrades$.next(this.clickUpgrades);
      const updatedClickUpgrades = [...this.currentClickUpgrade$.getValue(), upgrade];
      this.currentClickUpgrade$.next(updatedClickUpgrades);

      this.addAchievement(upgrade);
    }
  }
  
  buyDefense(defenseId: number) {
    const defense = this.defenses.find(d => d.id === defenseId);
    if (defense && this.points >= defense.cost) {
      this.points -= defense.cost;
      this.defensePoints += defense.pointsIncrease;
      this.defensePoints$.next(this.defensePoints);
      defense.count += 1;

      const defenseInstance = { ...defense }; // Copia de la defensa comprada
      this.activeDefenses.push(defenseInstance); // Agregar al estado activo
      this.currentDefenses$.next(this.activeDefenses);

      // Log y costo de defensa actualizados
      this._logService.addLog(`You bought a ${defense.name} for $${defense.cost}.`);
      defense.cost = Math.floor(defense.cost * defense.costIncrease);
      this.points$.next(this.points);
    }
  }

  private addAchievement(upgrade: Upgrade) {
    if (upgrade.count === 1) {  
      const currentAchievements = this.achievements$.getValue();
      this.achievements$.next([...currentAchievements, upgrade]);
      this._logService.addLog(`Achievement unlocked: My first ${upgrade.name}!`, 'achievement');
    }
  }

  public triggerAttack() {
    const attack = ATTACKS[Math.floor(Math.random() * ATTACKS.length)];
    this._logService.addLog(`Oh no! A ${attack.name} is happening!`, 'attack');
    this._logService.addLog(`You recieve ${attack.points} attack points from a ${attack.name}`, 'attack');
    this.attackEvent$.next(attack);
    this.processAttack(attack);
  }

  private processAttack(attack: Attack) {
    const attackPoints = attack.points;
  
    if (this.defensePoints >= attackPoints) {
      if (this.defensePoints - attackPoints <= 0) {        
        this.defensePoints = 0;
        this.activeDefenses = [];
        
        this.defensePoints$.next(this.defensePoints);
        this.currentDefenses$.next(this.activeDefenses);
        this._logService.addLog(`Your successfully repealed the ${attack.name}.`);
        this._logService.addLog(`In the heat of the battle you lost all your defenses.`);
        return;
      } else {
        const remainingDefense = this.defensePoints - attackPoints;
  
        this.defensePoints$.next(remainingDefense);
        this.reduceDefenses(attackPoints);
      }
    } else {
      this.points = 0;
      this.defensePoints = 0;
      this.activeDefenses = [];
      this.points$.next(this.points); 
      this.defensePoints$.next(this.defensePoints);
      this.currentDefenses$.next(this.activeDefenses);
      this._logService.addLog(`Your defenses aren't enough to counter the ${attack.name}.`);
      this._logService.addLog(`You lost all your cash.`);
    }
  }
  
  private reduceDefenses(attackPoints: number) {
    this.activeDefenses.sort((a, b) => b.pointsIncrease - a.pointsIncrease);
  
    let i = 0;
    while (i < this.activeDefenses.length && attackPoints > 0) {
      const defense = this.activeDefenses[i];
  
      if (defense.pointsIncrease <= attackPoints) {
        attackPoints -= defense.pointsIncrease;
        this.defensePoints -= defense.pointsIncrease;
        this.activeDefenses.splice(i, 1);
        this._logService.addLog(`A ${defense.name} died with honor. Remaining defense points: ${this.defensePoints}`);
      } else {
        defense.pointsIncrease -= attackPoints;
        this.defensePoints -= defense.pointsIncrease;
        attackPoints = 0;
        i++;
        this._logService.addLog(`Defense ${defense.name} partially reduced by ${attackPoints} points. Remaining defense points: ${defense.pointsIncrease}`);
      }
    }

    this.defensePoints$.next(this.defensePoints);
    this.currentDefenses$.next(this.activeDefenses);
  }
}