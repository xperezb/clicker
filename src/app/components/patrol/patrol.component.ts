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

    this.totalPoints$ = this._gameService.totalPoints$;
    // Suscribirse a upgrades nuevos comprados
    this._gameService.newClickUpgrade$.subscribe(newUpgrade => {
      // Añadir el nuevo upgrade al grupo correspondiente en el mapa `clickUpgradesById`
      if (!this.clickUpgradesById.has(newUpgrade.id)) {
        this.clickUpgradesById.set(newUpgrade.id, []); // Crear una nueva lista si el `id` no existe
      }
      // Usamos el operador de propagación para actualizar el array sin cambiar la referencia
      const upgradesArray = [...this.clickUpgradesById.get(newUpgrade.id)!, newUpgrade];
      this.clickUpgradesById.set(newUpgrade.id, upgradesArray);
    });
  }


}