import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-click-upgrades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './click-upgrade.component.html',
  styleUrls: ['./click-upgrade.component.css'],
})
export class ClickUpgradesComponent implements OnInit {
  clickUpgradeCount: number = 0;
  clickUpgradeCost: number = 0;
  pointsPerClick: number = 1; // Añadido para mostrar los puntos por segundo

  constructor(private gameService: GameService) {}

  ngOnInit() {
  // Obtener el contador de mejoras
  this.gameService.clickUpgradeCount$.subscribe((count) => {
  this.clickUpgradeCost = count;
  });

  // Suscribirse a la puntuación por segundo para mostrarla
  this.gameService.pointsPerClick$.subscribe((points) => {
    this.pointsPerClick = this.gameService.pointsPerClick; // Actualizar los puntos por segundo
  });

  this.gameService.clickUpgradeCost$.subscribe((cost) => {
  this.clickUpgradeCost = cost;
  }) // Llama al método de compra en GameService
  }

  buyUpgrade() {
    this.gameService.buyClickUpgrade(1);
  }
}
