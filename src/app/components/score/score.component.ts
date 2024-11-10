import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  points$?: Observable<number>;
  pointsPerClick$?: Observable<number>;
  pointsPerSecond$?: Observable<number>;
  defensePoints$?: Observable<number>;
  
  constructor(private _gameService: GameService) {}

  ngOnInit() {
    this.points$ = this._gameService.points$;
    this.pointsPerClick$ = this._gameService.pointsPerClick$;
    this.pointsPerSecond$ = this._gameService.pointsPerSecond$;
    this.defensePoints$ = this._gameService.defensePoints$;
  }
}
