import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-score',
  standalone: true,
  template: `<h2>Puntaje: {{ points }}</h2>`,
  styles: [
    `
      h2 {
        font-size: 28px;
        margin-top: 20px;
      }
    `,
  ],
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