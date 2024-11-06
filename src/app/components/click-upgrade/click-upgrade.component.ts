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
  pointsPerClick: number = 1;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.getClickUpgradeCount();
    this.getPointsPerClick();
    this.getClickUpgradeCost();
  }

  public buyUpgrade() {
    this.gameService.buyClickUpgrade(1);
  }

  private getClickUpgradeCount() {
    this.gameService.clickUpgradeCount$.subscribe((count) => {
      this.clickUpgradeCount = count;
    });
  }

  private getPointsPerClick() {
    this.gameService.pointsPerClick$.subscribe((pointsPerClick) => {
      this.pointsPerClick = pointsPerClick;
    });
  }

  private getClickUpgradeCost() {
    this.gameService.clickUpgradeCost$.subscribe((cost) => {
      this.clickUpgradeCost = cost;
    });
  }
}
