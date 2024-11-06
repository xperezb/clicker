import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-score',
  standalone: true,
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  points: number = 0;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.points$.subscribe((points) => {
      this.points = points;
    });
  }
}
