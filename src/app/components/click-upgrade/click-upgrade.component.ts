import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Upgrade } from '../../interfaces/upgrade';

@Component({
  selector: 'app-click-upgrades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './click-upgrade.component.html',
  styleUrls: ['./click-upgrade.component.css'],
})
export class ClickUpgradesComponent implements OnInit {
  clickUpgrades: Upgrade[] = [];
  pointsPerClick: number = 1;
  points: number = 0;
  totalPoints: number = 0;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.getClickUpgrades();
    this.getPointsPerClick();
    this.getTotalPoints();
    this.getPoints();
  }

  public buyClickUpgrade(upgradeId: number) {
    this.gameService.buyClickUpgrade(upgradeId);
  }

  private getClickUpgrades() {
    this.gameService.clickUpgrades$.subscribe((clickUpgrades) => {
      this.clickUpgrades = clickUpgrades;
    });
  }

  private getPointsPerClick() {
    this.gameService.pointsPerClick$.subscribe((pointsPerClick) => {
      this.pointsPerClick = pointsPerClick;
    });
  }

  private getTotalPoints() {
    this.gameService.totalPoints$.subscribe((totalPoints) => {
      this.totalPoints = totalPoints;
    });
  }

  private getPoints() {
    this.gameService.points$.subscribe((points) => {
      this.points = points;
    });
  }
}
