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
  constructor(public _gameService: GameService) {}

  updatePoints(value: number) {
    this._gameService.points = value;
    this._gameService.points$.next(value);
  }

  updateTotalPoints(value: number) {
    this._gameService.totalPoints = value;
    this._gameService.totalPoints$.next(value);
  }

  updatePointsPerClick(value: number) {
    this._gameService.pointsPerClick = value;
    this._gameService.pointsPerClick$.next(value);
  }

  updatePointsPerSecond(value: number) {
    this._gameService.pointsPerSecond = value;
    this._gameService.pointsPerSecond$.next(value);
  }

  updateDefensePoints(value: number) {
    this._gameService.defensePoints = value;
    this._gameService.defensePoints$.next(value);
  }
}
