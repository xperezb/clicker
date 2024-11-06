import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-clicker',
  standalone: true,
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.css'],
})
export class ClickerComponent {
  constructor(private gameService: GameService) {}

  handleClick() {
    this.gameService.click();
  }
}
