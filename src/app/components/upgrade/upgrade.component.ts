import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Upgrade } from '../../interfaces/upgrade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upgrades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css'],
})
export class UpgradesComponent implements OnInit {
  upgrades$?: Observable<Upgrade[]>;
  pointsPerSecond$?: Observable<number>;
  points$?: Observable<number>;
  totalPoints$?: Observable<number>;

  constructor(private gameService: GameService) {
    this.upgrades$ = this.gameService.upgrades$;
    this.pointsPerSecond$ = this.gameService.pointsPerSecond$;
    this.points$ = this.gameService.points$;
    this.totalPoints$ = this.gameService.totalPoints$;
  }

  ngOnInit() {}

  public buyUpgrade(upgradeId: number) {
    this.gameService.buyUpgrade(upgradeId);
  }
}
