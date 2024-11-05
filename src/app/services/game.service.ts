import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private points = 0; // Puntaje actual
  private pointsPerClick = 1;
  public pointsPerSecond = 0;

  private upgradeCost = 10; // Costo inicial de la mejora
  private upgradeCount = 0;

  // BehaviorSubjects para hacer los datos reactivos
  upgradeCount$ = new BehaviorSubject<number>(this.upgradeCount);
  points$ = new BehaviorSubject<number>(this.points);
  upgradeCost$ = new BehaviorSubject<number>(this.upgradeCost); // Nuevo observable para el costo

  constructor() {
    // Incremento automático de puntos por segundo
    setInterval(() => {
      this.addPoints(this.pointsPerSecond);
    }, 1000);
  }

  addPoints(points: number) {
    this.points += points;
    this.points$.next(this.points);
  }

  click() {
    this.addPoints(this.pointsPerClick);
  }

  // Método para comprar mejoras
  buyUpgrade(increase: number) {
    if (this.points >= this.upgradeCost) {
      this.points -= this.upgradeCost;
      this.pointsPerSecond += increase;
      this.points$.next(this.points);

      // Incrementa el contador de mejoras y emite el nuevo valor
      this.upgradeCount += 1;
      this.upgradeCount$.next(this.upgradeCount);

      // Incrementa el costo de la mejora en un 5%, sin decimales
      this.upgradeCost = Math.floor(this.upgradeCost + 5);
      this.upgradeCost$.next(this.upgradeCost); 
    }
  }
}