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
  public pointsPerClick = 1;
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
    this.attackEvent$.next(attack); // Emitir el evento de ataque
    this.processAttack(attack);
  }

  private processAttack(attack: Attack) {
    const attackPoints = attack.points;
  
    // Debugging: mostrar valores antes de la comparación
    console.log('Puntos de defensa antes del ataque:', this.defensePoints);
    console.log('Puntos de ataque:', attackPoints);
  
    // Comprobar si hay suficientes puntos de defensa para detener el ataque
    if (this.defensePoints >= attackPoints) {
      console.log('Defensa suficiente para detener el ataque');
      this.defensePoints -= attackPoints;
      this.defensePoints$.next(this.defensePoints);
      const remainingAttack = attackPoints - this.defensePoints;
      this.reduceDefenses(remainingAttack);

    } else {
      // Si no hay suficiente defensa, calculamos el ataque restante
      const remainingAttack = attackPoints - this.defensePoints;
      this.defensePoints = 0;  // Restamos toda la defensa disponible
      this.defensePoints$.next(this.defensePoints);
      
      // Aquí es donde reducimos las defensas activas
      console.log('Defensa insuficiente, resto de ataque:', remainingAttack);
      this.reduceDefenses(remainingAttack);
    }
  
    // Emitir el estado actualizado de las defensas activas
    console.log('Defensas activas antes de la actualización:', this.activeDefenses);
    this.currentDefenses$.next(this.activeDefenses.filter(d => d.pointsIncrease > 0));  // Solo las defensas con puntos restantes
  }
  
  private reduceDefenses(remainingAttack: number) {
    // Ordenamos las defensas activas por `pointsIncrease` en orden descendente
    this.activeDefenses.sort((a, b) => b.pointsIncrease - a.pointsIncrease);
  
    // Usamos un ciclo while con un índice que no se vea afectado por la eliminación de elementos.
    let i = 0;
    while (i < this.activeDefenses.length && remainingAttack > 0) {
      const defense = this.activeDefenses[i];
  
      // Verificamos si la defensa puede ser completamente destruida o no
      if (defense.pointsIncrease <= remainingAttack) {
        // Si el ataque destruye la defensa, restamos los puntos de ataque y eliminamos la defensa
        remainingAttack -= defense.pointsIncrease;
        this.activeDefenses.splice(i, 1);  // Eliminar la defensa del array
        console.log(`Defensa destruida: ${defense.name}, puntos restantes de ataque: ${remainingAttack}`);
        // No incrementamos `i` porque `splice` ajusta automáticamente los índices
      } else {
        // Si la defensa no se destruye completamente, reducimos sus puntos
        defense.pointsIncrease -= remainingAttack;
        remainingAttack = 0;  // El ataque ha sido detenido, no queda más daño por aplicar
        console.log(`Defensa parcialmente destruida: ${defense.name}, puntos restantes de ataque: ${remainingAttack}`);
        i++;  // Solo avanzamos el índice si no eliminamos la defensa
      }
    }
  
    // Imprimir el estado actualizado de las defensas activas, para asegurarnos de que se imprime siempre
    console.log('Defensas después del ataque:', this.activeDefenses);
  
    // Emitimos el estado actualizado de las defensas activas
    this.currentDefenses$.next(this.activeDefenses);
  }
}