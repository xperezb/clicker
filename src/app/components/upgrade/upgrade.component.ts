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
  pointsPerSecond: number = 0;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.getUpgradeCount();
    this.getPointsPerSecond();
    this.getUpgradeCost();
  }

  public buyUpgrade() {
    this.gameService.buyUpgrade(1);
  }

  private getUpgradeCount() {
    this.gameService.upgradeCount$.subscribe((count) => {
        this.upgradeCount = count;
    });
  }

  private getPointsPerSecond() {
    this.gameService.pointsPerSecond$.subscribe((pointsPerSecond) => {
        this.pointsPerSecond = pointsPerSecond;
    });
  }

  private getUpgradeCost() {
    this.gameService.upgradeCost$.subscribe((cost) => {
        this.upgradeCost = cost;
    });
  }
}
