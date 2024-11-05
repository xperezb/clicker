import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upgrades',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <button (click)="buyUpgrade()">
        Mejora (+1 punto/seg, costo: {{ upgradeCost }} puntos)
        <span *ngIf="upgradeCount > 0">(+{{ pointsPerSecond }} p/s)</span>
      </button>
    </div>
  `,
  styles: [
    `
      button {
        font-size: 18px;
        padding: 8px 16px;
        margin-top: 20px;
        cursor: pointer;
      }
    `,
  ],
})
export class UpgradesComponent implements OnInit {
  upgradeCount: number = 0;
  upgradeCost: number = 0;
  pointsPerSecond: number = 0; // Añadido para mostrar los puntos por segundo

  constructor(private gameService: GameService) {}

  ngOnInit() {
    // Obtener el contador de mejoras
    this.gameService.upgradeCount$.subscribe((count) => {
      this.upgradeCount = count;
    });

    // Suscribirse a la puntuación por segundo para mostrarla
    this.gameService.points$.subscribe((points) => {
      this.pointsPerSecond = this.gameService.pointsPerSecond; // Actualizar los puntos por segundo
    });

    this.gameService.upgradeCost$.subscribe((cost) => {
      this.upgradeCost = cost;
    }) // Llama al método de compra en GameService
  }

  buyUpgrade() {
    this.gameService.buyUpgrade(1);
  }
}