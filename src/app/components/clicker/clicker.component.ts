import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-clicker',
  standalone: true,
  template: `<button (click)="handleClick()">Click me!</button>`,
  styles: [
    `
      button {
        font-size: 24px;
        padding: 10px 20px;
        margin-top: 20px;
        cursor: pointer;
      }
    `,
  ],
})
export class ClickerComponent {
  constructor(private gameService: GameService) {}

  handleClick() {
    this.gameService.click();
  }
}