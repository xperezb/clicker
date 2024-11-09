import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClickerComponent } from './components/clicker/clicker.component';
import { ScoreComponent } from './components/score/score.component';
import { GameService } from './services/game.service';
import { EmpireViewComponent } from './components/empire-view/empire-view.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { LogComponent } from './components/log/log.component';
import { UpgradesComponent } from './components/upgrades/upgrades.component';
import { Observable } from 'rxjs';
import { Defense } from './interfaces/defense';
import { Upgrade } from './interfaces/upgrade';
import { DevToolsComponent } from './components/dev-tools/dev-tools.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ClickerComponent,
    ScoreComponent,
    EmpireViewComponent,
    AchievementsComponent,
    LogComponent,
    UpgradesComponent,
    DevToolsComponent
  ],
  providers: [GameService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '-Drug Lord Clicker-';
  upgrades$?: Observable<Upgrade[]>;
  clickUpgrades$?: Observable<Upgrade[]>;
  defenses$?: Observable<Defense[]>;
  points$?: Observable<number>;
  totalPoints$?: Observable<number>;
  showDevTools = false;

  constructor(private _gameService: GameService) {
    this.upgrades$ = this._gameService.upgrades$;
    this.clickUpgrades$ = this._gameService.clickUpgrades$;
    this.defenses$ = this._gameService.defenses$;
    this.points$ = this._gameService.points$;
    this.totalPoints$ = this._gameService.totalPoints$;
  }

  ngOnInit() {}

  public buyUpgrade = (upgradeId: number) => {
    this._gameService.buyUpgrade(upgradeId);
  }

  public buyClickUpgrade = (upgradeId: number) => {
    this._gameService.buyClickUpgrade(upgradeId);
  }

  public buyDefense = (defenseId: number) => {
    this._gameService.buyDefense(defenseId);
  }

  public toggleDevTools() {
    this.showDevTools = !this.showDevTools;
  }

}
