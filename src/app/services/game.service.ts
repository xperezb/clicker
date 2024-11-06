import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private points = 0;
  public pointsPerClick = 1;
  public pointsPerSecond = 0;

  private upgradeCost = 10;
  private upgradeCount = 0;
  private clickUpgradeCost = 10;
  private clickUpgradeCount = 0;

  upgradeCount$ = new BehaviorSubject<number>(this.upgradeCount);
  clickUpgradeCount$ = new BehaviorSubject<number>(this.clickUpgradeCount);
  points$ = new BehaviorSubject<number>(this.points);
  pointsPerSecond$ = new BehaviorSubject<number>(this.pointsPerSecond);
  pointsPerClick$ = new BehaviorSubject<number>(this.pointsPerClick);
  upgradeCost$ = new BehaviorSubject<number>(this.upgradeCost);
  clickUpgradeCost$ = new BehaviorSubject<number>(this.clickUpgradeCost);

  private drawDotSubject = new Subject<{ x: number, y: number }>();
  drawDot$ = this.drawDotSubject.asObservable();
  private dotCount = 0; 


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
        this.points$.next(this.points);
        pointsToAdd -= 1;
      } else {
        clearInterval(intervalId);
      }
    }, incrementInterval);
  }

  addPoints(points: number) {
    this.points += points;
    this.points$.next(this.points);
  }

  click() {
    this.addPoints(this.pointsPerClick);
  }

  buyUpgrade(increase: number) {
    if (this.points >= this.upgradeCost) {
      this.points -= this.upgradeCost;
      this.pointsPerSecond += increase;
      this.upgradeCount += 1;
      this.upgradeCost = Math.floor(this.upgradeCost + 5);

      this.points$.next(this.points);
      this.pointsPerSecond$.next(this.pointsPerSecond);
      this.upgradeCount$.next(this.upgradeCount);
      this.upgradeCost$.next(this.upgradeCost);

      // Calculate the position for the new dot
      const x = (this.dotCount % 10) * 50 + 25; // 50px apart, starting at 25px
      const y = Math.floor(this.dotCount / 10) * 50 + 25; // 50px apart, starting at 25px
      this.drawDotSubject.next({ x, y });

      this.dotCount += 1; // Increment the dot counter
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
}
