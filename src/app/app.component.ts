import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClickerComponent } from './components/clicker/clicker.component';
import { ScoreComponent } from './components/score/score.component';
import { UpgradesComponent } from './components/upgrade/upgrade.component';
import { GameService } from './services/game.service';
import { ClickUpgradesComponent } from './components/click-upgrade/click-upgrade.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ClickerComponent,
    ScoreComponent,
    UpgradesComponent,
    ClickUpgradesComponent
  ],
  providers: [GameService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clicker';
}
