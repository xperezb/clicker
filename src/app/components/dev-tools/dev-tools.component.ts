import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-dev-tools',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dev-tools.component.html',
  styleUrl: './dev-tools.component.css'
})
export class DevToolsComponent {
  constructor(public gameService: GameService) {}

  updatePoints(value: number) {
    this.gameService.points = value;
    this.gameService.points$.next(value);
  }

  updateTotalPoints(value: number) {
    this.gameService.totalPoints = value;
    this.gameService.totalPoints$.next(value);
  }

  updatePointsPerClick(value: number) {
    this.gameService.pointsPerClick = value;
    this.gameService.pointsPerClick$.next(value);
  }

  updatePointsPerSecond(value: number) {
    this.gameService.pointsPerSecond = value;
    this.gameService.pointsPerSecond$.next(value);
  }

  updateDefensePoints(value: number) {
    this.gameService.defensePoints = value;
    this.gameService.defensePoints$.next(value);
  }
}
