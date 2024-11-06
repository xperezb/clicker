import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upgrades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css'],
})
export class UpgradesComponent implements OnInit {
  upgradeCount: number = 0;
  upgradeCost: number = 0;
  pointsPerSecond: number = 0; // Añadido para mostrar los puntos por segundo

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.subscribeToUpgradeCount();
    this.subscribeToPoints();
    this.subscribeToUpgradeCost();
  }

  private subscribeToUpgradeCount() {
    this.gameService.upgradeCount$.subscribe((count) => {
        this.upgradeCount = count;
    });
  }

  // Actualizar los puntos por segundo
  private subscribeToPoints() {
    this.gameService.points$.subscribe(() => {
        this.pointsPerSecond = this.gameService.pointsPerSecond;
    });
  }

  private subscribeToUpgradeCost() {
    this.gameService.upgradeCost$.subscribe((cost) => {
        this.upgradeCost = cost;
    });
  }

  buyUpgrade() {
    this.gameService.buyUpgrade(1);
  }
}
