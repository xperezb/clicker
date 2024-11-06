import { Component } from '@angular/core';
import { FarmComponent } from './components/farm.component';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empire-view',
  standalone: true,
  imports:  [FarmComponent, CommonModule],
  templateUrl: './empire-view.component.html',
  styleUrls: ['./empire-view.component.css'],
})
export class EmpireViewComponent { 
  farmCount: number = 0;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.upgrades$.subscribe(upgrades => {
      const upgrade = upgrades.find(u => u.id === 1);
      this.farmCount = upgrade ? upgrade.count : 0;
    });
  }
}