import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Upgrade } from '../../interfaces/upgrade';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Defense } from '../../interfaces/defense';

@Component({
  selector: 'app-defense',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './defense.component.html',
  styleUrl: './defense.component.css'
})
export class DefenseComponent {
  defenses$?: Observable<Defense[]>;
  pointsPerSecond$?: Observable<number>;
  points$?: Observable<number>;
  totalPoints$?: Observable<number>;
  defensePoints$?: Observable<number>;

  constructor(private gameService: GameService) {
    this.defenses$ = this.gameService.defenses$;
    this.pointsPerSecond$ = this.gameService.pointsPerSecond$;
    this.points$ = this.gameService.points$;
    this.totalPoints$ = this.gameService.totalPoints$;
    this.defensePoints$ = this.gameService.defensePoints$;
  }

  ngOnInit() {}

  public buyDefense(defenseId: number) {
    this.gameService.buyDefense(defenseId);
  }
}
