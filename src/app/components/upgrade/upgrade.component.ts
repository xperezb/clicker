import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Upgrade } from '../../interfaces/upgrade';

@Component({
  selector: 'app-upgrades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css'],
})
export class UpgradesComponent implements OnInit {
  upgrades: Upgrade[] = [];
  pointsPerSecond: number = 0;
  points: number = 0;
  totalPoints: number = 0;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.getUpgrades();
    this.getPointsPerSecond();
    this.getTotalPoints();
    this.getPoints();
  }

  public buyUpgrade(upgradeId: number) {
    this.gameService.buyUpgrade(upgradeId);
  }

  private getUpgrades() {
    this.gameService.upgrades$.subscribe((upgrades) => {
      this.upgrades = upgrades;
    });
  }

  private getPointsPerSecond() {
    this.gameService.pointsPerSecond$.subscribe((pointsPerSecond) => {
      this.pointsPerSecond = pointsPerSecond;
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
