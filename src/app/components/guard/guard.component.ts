import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Defense } from '../../interfaces/defense';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guard.component.html',
  styleUrl: './guard.component.css'
})
export class GuardComponent implements OnInit {
  defenses$?: Observable<Defense[]>;

  constructor(private _gameService: GameService) { }

  ngOnInit() {
    this.defenses$ = this._gameService.currentDefenses$;
  }
}
