import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Upgrade } from '../interfaces/upgrade';
import { FarmComponent } from '../components/empire-view/components/farm.component';

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
    { id: 1, name: 'Plant Marihuana', cost: 10, costIncrease: 0, pointsIncrease: 1, count: 0, requiredPoints: 0, icon: FarmComponent },
    { id: 2, name: 'Sling Cocaine', cost: 50, costIncrease: 0, pointsIncrease: 5, count: 0, requiredPoints: 100, icon: FarmComponent },
    { id: 3, name: 'Sell Heroin', cost: 100, costIncrease: 0, pointsIncrease: 10, count: 0, requiredPoints: 200, icon: FarmComponent},
    { id: 4, name: 'Produce Meth', cost: 500, costIncrease: 0, pointsIncrease: 50, count: 0, requiredPoints: 300 },
    { id: 5, name: 'Traffic Humans', cost: 1000, costIncrease: 0, pointsIncrease: 100, count: 0, requiredPoints: 400, icon: FarmComponent },
  ];
  
  clickUpgrades: Upgrade[] = [
    { id: 0, name: 'Magic button', cost: 0, costIncrease: 0, pointsIncrease: 1000000, count: 0, requiredPoints: 0, icon: FarmComponent },
    { id: 1, name: 'Bike', cost: 10, costIncrease: 0, pointsIncrease: 1, count: 0, requiredPoints: 0 },
    { id: 2, name: 'MotorBike', cost: 100, costIncrease: 0, pointsIncrease: 5, count: 0, requiredPoints: 100 },
    { id: 3, name: 'Ahmed', cost: 1000, costIncrease: 0, pointsIncrease: 10, count: 0, requiredPoints: 200 },
    { id: 4, name: 'M13 Gang Member', cost: 10000, costIncrease: 0, pointsIncrease: 50, count: 0, requiredPoints: 300 },
    { id: 5, name: '18ST Gang Member', cost: 10000, costIncrease: 0, pointsIncrease: 50, count: 0, requiredPoints: 300 },
    { id: 6, name: 'Pick-up Truck', cost: 50000, costIncrease: 0, pointsIncrease: 100, count: 0, requiredPoints: 400 },
    { id: 7, name: 'Local Police Officer', cost: 100000, costIncrease: 0, pointsIncrease: 1500, count: 0, requiredPoints: 1000 }, 
    { id: 8, name: 'FBI Agent', cost: 1000000, costIncrease: 0, pointsIncrease: 2000, count: 0, requiredPoints: 2000 },
    { id: 9, name: 'CIA Agent', cost: 5000000, costIncrease: 0, pointsIncrease: 2000, count: 0, requiredPoints: 2000 }
  ];

  points$ = new BehaviorSubject<number>(this.points);
  totalPoints$ = new BehaviorSubject<number>(this.totalPoints); // Nueva propiedad
  pointsPerClick$ = new BehaviorSubject<number>(this.pointsPerClick);
  pointsPerSecond$ = new BehaviorSubject<number>(this.pointsPerSecond);
  clickUpgradeCount$ = new BehaviorSubject<number>(this.clickUpgradeCount);
  clickUpgradeCost$ = new BehaviorSubject<number>(this.clickUpgradeCost);
  upgrades$ = new BehaviorSubject<Upgrade[]>(this.upgrades);
  clickUpgrades$ = new BehaviorSubject<Upgrade[]>(this.clickUpgrades);
  achievements$ = new BehaviorSubject<Upgrade[]>([]);

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
      upgrade.cost = Math.floor(upgrade.cost + 5);

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
      upgrade.cost = Math.floor(upgrade.cost + 5);

      this.points$.next(this.points);
      this.pointsPerClick$.next(this.pointsPerClick);
      this.clickUpgrades$.next(this.clickUpgrades);

      this.addAchievement(upgrade);
    }
  }

  private addAchievement(upgrade: Upgrade) {
    if (upgrade.count === 1) {  
      const currentAchievements = this.achievements$.getValue();
      this.achievements$.next([...currentAchievements, upgrade]);
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
