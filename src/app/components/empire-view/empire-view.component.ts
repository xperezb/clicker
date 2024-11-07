import { Component } from '@angular/core';
import { FarmComponent } from './components/farm.component';
import { GameService } from '../../services/game.service';
import { Upgrade } from '../../interfaces/upgrade';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-empire-view',
  standalone: true,
  imports: [FarmComponent, CommonModule],
  templateUrl: './empire-view.component.html',
  styleUrls: ['./empire-view.component.css'],
})
export class EmpireViewComponent { 
  upgrades: Upgrade[] = [];
  
  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.upgrades$.subscribe(upgrades => {
      this.upgrades = upgrades.filter(upgrade => upgrade.count > 0);
    });
  }
}
