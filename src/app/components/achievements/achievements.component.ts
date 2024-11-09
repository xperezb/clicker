import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Upgrade } from '../../interfaces/upgrade';
import { GameService } from '../../services/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css'
})
export class AchievementsComponent {
  achievements$?: Observable<Upgrade[]>;

  constructor(private _gameService: GameService) {}

  ngOnInit() {
    this.achievements$ = this._gameService.achievements$;
  }
}
