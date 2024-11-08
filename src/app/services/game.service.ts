import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Upgrade } from '../interfaces/upgrade';
import { UPGRADES, CLICK_UPGRADES, DEFENSES } from '../config/config';
import { Defense } from '../interfaces/defense';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private points = 0;
  public totalPoints = 0;
  public pointsPerClick = 1;
  public pointsPerSecond = 0;
  private defensePoints = 0;

  private clickUpgradeCost = 10;
  private clickUpgradeCount = 0;

  upgrades: Upgrade[] = UPGRADES;
  defenses: Defense[] = DEFENSES;
  clickUpgrades: Upgrade[] = CLICK_UPGRADES;

  points$ = new BehaviorSubject<number>(this.points);
  defensePoints$ = new BehaviorSubject<number>(this.defensePoints);
  totalPoints$ = new BehaviorSubject<number>(this.totalPoints);
  pointsPerClick$ = new BehaviorSubject<number>(this.pointsPerClick);
  pointsPerSecond$ = new BehaviorSubject<number>(this.pointsPerSecond);
  clickUpgradeCount$ = new BehaviorSubject<number>(this.clickUpgradeCount);
  clickUpgradeCost$ = new BehaviorSubject<number>(this.clickUpgradeCost);
  upgrades$ = new BehaviorSubject<Upgrade[]>(this.upgrades);
  clickUpgrades$ = new BehaviorSubject<Upgrade[]>(this.clickUpgrades);
  defenses$ = new BehaviorSubject<Defense[]>(this.defenses);
  achievements$ = new BehaviorSubject<Upgrade[]>([]);

  constructor(private _logService: LogService) {
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
        this.updateAvailableUpgrades();
        this.updateAvailableClickUpgrades();
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
    this.updateAvailableUpgrades(); 
    this.updateAvailableClickUpgrades();
  }

  click() {
    this.addPoints(this.pointsPerClick);
  }

  buyUpgrade(upgradeId: number) {
    const upgrade = this.upgrades.find(u => u.id === upgradeId);
    if (upgrade && this.points >= upgrade.cost) {
      this.points -= upgrade.cost;
      this.pointsPerSecond += upgrade.pointsIncrease;
      upgrade.count += 1;
      upgrade.cost = Math.floor(upgrade.cost * upgrade.costIncrease);

      this.points$.next(this.points);
      this.pointsPerSecond$.next(this.pointsPerSecond);
      this.upgrades$.next(this.upgrades);

      this._logService.addLog(`You bought a ${upgrade.name}!`);
      this.addAchievement(upgrade);
    }
  }

  buyClickUpgrade(upgradeId: number) {
    const upgrade = this.clickUpgrades.find(u => u.id === upgradeId);
    if (upgrade && this.points >= upgrade.cost) {
      this.points -= upgrade.cost;
      this.pointsPerClick += upgrade.pointsIncrease;
      upgrade.count += 1;
      upgrade.cost = Math.floor(upgrade.cost * upgrade.costIncrease);

      this.points$.next(this.points);
      this.pointsPerClick$.next(this.pointsPerClick);
      this.clickUpgrades$.next(this.clickUpgrades);

      this._logService.addLog(`You bought a ${upgrade.name}!`);
      this.addAchievement(upgrade);
    }
  }
  buyDefense(defenseId: number) {
    const defense = this.defenses.find(u => u.id === defenseId);
    if (defense && this.points >= defense.cost) {
      this.points -= defense.cost;
      this.defensePoints += defense.pointsIncrease;
      defense.count += 1;
      defense.cost = Math.floor(defense.cost * defense.costIncrease);

      this.points$.next(this.points);
      this.defensePoints$.next(this.defensePoints)
      
      this._logService.addLog(`You bought a ${defense.name}!`);
      this.addAchievement(defense);
    }
  }

  private addAchievement(upgrade: Upgrade) {
    if (upgrade.count === 1) {  
      const currentAchievements = this.achievements$.getValue();
      this.achievements$.next([...currentAchievements, upgrade]);
      this._logService.addLog(`Achievement unlocked: My first ${upgrade.name}!`);
    }
  }

  private updateAvailableUpgrades() {
    const availableUpgrades = this.upgrades.filter(upgrade => this.totalPoints >= upgrade.requiredPoints);
    this.upgrades$.next(availableUpgrades);
  }

  private updateAvailableClickUpgrades() {
    const availableClickUpgrades = this.clickUpgrades.filter(upgrade => this.totalPoints >= upgrade.requiredPoints);
    this.clickUpgrades$.next(availableClickUpgrades);
  }
}
