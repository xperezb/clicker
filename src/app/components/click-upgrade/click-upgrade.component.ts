import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Upgrade } from '../../interfaces/upgrade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-click-upgrades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './click-upgrade.component.html',
  styleUrls: ['./click-upgrade.component.css'],
})
export class ClickUpgradesComponent implements OnInit {
  clickUpgrades$?: Observable<Upgrade[]>;
  pointsPerClick$?: Observable<number>;
  points$?: Observable<number>;
  totalPoints$?: Observable<number>;

  constructor(private gameService: GameService) {  }

  ngOnInit() {
    this.getValues();
  }

  public buyClickUpgrade(upgradeId: number) {
    this.gameService.buyClickUpgrade(upgradeId);
  }

  private getValues() {
    this.clickUpgrades$ = this.gameService.clickUpgrades$;
    this.pointsPerClick$ = this.gameService.pointsPerClick$;
    this.points$ = this.gameService.points$;
    this.totalPoints$ = this.gameService.totalPoints$;
  }
}
