import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Upgrade } from '../interfaces/upgrade';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private points = 0;
  public totalPoints = 0;
  public pointsPerClick = 1;
  public pointsPerSecond = 0;

  private clickUpgradeCost = 10;
  private clickUpgradeCount = 0;

  upgrades: Upgrade[] = [
    { id: 1, name: 'Plant Marihuana', cost: 10, increase: 1, count: 0, requiredPoints: 0 },
    { id: 2, name: 'Sling Cocaine', cost: 50, increase: 5, count: 0, requiredPoints: 100 },
    { id: 3, name: 'Sell Heroin', cost: 100, increase: 10, count: 0, requiredPoints: 200 },
    { id: 4, name: 'Produce Meth', cost: 500, increase: 50, count: 0, requiredPoints: 300 },
    { id: 5, name: 'Traffic Humans', cost: 1000, increase: 100, count: 0, requiredPoints: 400 },
  ];

  points$ = new BehaviorSubject<number>(this.points);
  totalPoints$ = new BehaviorSubject<number>(this.totalPoints); // Nueva propiedad
  pointsPerClick$ = new BehaviorSubject<number>(this.pointsPerClick);
  pointsPerSecond$ = new BehaviorSubject<number>(this.pointsPerSecond);
  clickUpgradeCount$ = new BehaviorSubject<number>(this.clickUpgradeCount);
  clickUpgradeCost$ = new BehaviorSubject<number>(this.clickUpgradeCost);
  upgrades$ = new BehaviorSubject<Upgrade[]>(this.upgrades);

  constructor() {
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
        pointsToAdd -= 1;
      } else {
        clearInterval(intervalId);
      }
    }, incrementInterval);
  }

  addPoints(points: number) {
    this.points += points;
    this.totalPoints += points; // Actualizar la puntuación total
    this.points$.next(this.points);
    this.totalPoints$.next(this.totalPoints);
    console.log(this.totalPoints) // Emitir la puntuación total
    this.updateAvailableUpgrades(); // Actualizar upgrades disponibles
  }

  click() {
    this.addPoints(this.pointsPerClick);
  }

  buyUpgrade(upgradeId: number) {
    const upgrade = this.upgrades.find(u => u.id === upgradeId);
    if (upgrade && this.points >= upgrade.cost) {
      this.points -= upgrade.cost;
      this.pointsPerSecond += upgrade.increase;
      upgrade.count += 1;
      upgrade.cost = Math.floor(upgrade.cost + 5);

      this.points$.next(this.points);
      this.pointsPerSecond$.next(this.pointsPerSecond);
      this.upgrades$.next(this.upgrades);
    }
  }

  buyClickUpgrade(increase: number) {
    if (this.points >= this.clickUpgradeCost) {
      this.points -= this.clickUpgradeCost;
      this.pointsPerClick += increase;
      this.clickUpgradeCount += 1;
      this.clickUpgradeCost = Math.floor(this.clickUpgradeCost + 5);

      this.points$.next(this.points);
      this.pointsPerClick$.next(this.pointsPerClick);
      this.clickUpgradeCount$.next(this.clickUpgradeCount);
      this.clickUpgradeCost$.next(this.clickUpgradeCost);
    }
  }

  private updateAvailableUpgrades() {
    const availableUpgrades = this.upgrades.filter(upgrade => this.totalPoints >= upgrade.requiredPoints);
    this.upgrades$.next(availableUpgrades);
  }
}