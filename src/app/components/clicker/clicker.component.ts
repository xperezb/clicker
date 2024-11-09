import { Component, ComponentRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CashComponent } from '../cash/cash.component';
import { MoreCashComponent } from '../more-cash/more-cash.component';

@Component({
  selector: 'app-clicker',
  standalone: true,
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.css'],
})
export class ClickerComponent {
  @ViewChild('cashContainer', { read: ViewContainerRef }) cashContainer!: ViewContainerRef;

  constructor(private gameService: GameService) {}

  handleClick() {
    this.gameService.click();
    this.createFallingBills();
  }

  private createFallingBills(): void {
    const ComponentToRender = this.gameService.pointsPerClick > 100 ? MoreCashComponent : CashComponent;

    for (let i = 0; i < this.gameService.pointsPerClick; i++) {
      const componentRef: ComponentRef<CashComponent> = this.cashContainer.createComponent(ComponentToRender);

      // Posicionar el billete en una posición aleatoria en todo el ancho de la pantalla
      const xPos = Math.random() * (window.innerWidth -50);
      componentRef.location.nativeElement.style.position = 'absolute';
      componentRef.location.nativeElement.style.left = `${xPos}px`;
      componentRef.location.nativeElement.style.top = `-50px`; // Fuera de la pantalla

      // Eliminar el billete después de 5 segundos (duración de la animación)
      setTimeout(() => {
        componentRef.destroy();
      }, 4600);
    }
  }
}