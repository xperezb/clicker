import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Upgrade } from '../../interfaces/upgrade';
import { GameService } from '../../services/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patrol',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patrol.component.html',
  styleUrl: './patrol.component.css'
})
export class PatrolComponent {
  clickUpgradesById = new Map<number, Upgrade[]>(); // Mapa para agrupar upgrades por `id`
  totalPoints$?: Observable<number>;

  constructor(private _gameService: GameService) {}

  ngOnInit() {
    // Suscribirse a `clickUpgrades$` para recibir la lista completa de mejoras
    this._gameService.clickUpgrades$.subscribe((upgrades) => {
      // Limpiar el mapa antes de agrupar
      this.clickUpgradesById.clear();
      
      // Agrupar las mejoras por `id`
      upgrades.forEach((upgrade) => {
        if (upgrade.count > 0) {
          if (!this.clickUpgradesById.has(upgrade.id)) {
            this.clickUpgradesById.set(upgrade.id, []);
          }
          // Añadir tantas instancias como el valor de `count`
          for (let i = 0; i < upgrade.count; i++) {
            this.clickUpgradesById.get(upgrade.id)!.push(upgrade);
          }
        }
      });
    });
  }
  
}