import { Component, ComponentRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CashComponent } from '../cash/cash.component';
import { MoreCashComponent } from '../more-cash/more-cash.component';
import { MoreMoreCashComponent } from '../more-more-cash/more-more-cash.component';

@Component({
  selector: 'app-clicker',
  standalone: true,
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.css'],
})
export class ClickerComponent {
  @ViewChild('cashContainer', { read: ViewContainerRef }) cashContainer!: ViewContainerRef;

  constructor(private _gameService: GameService) {}

  handleClick() {
    this._gameService.click();
    this.createFallingBills();
  }

  private createFallingBills(): void {
    const ComponentToRender = this.getComponentToRender();

    for (let i = 0; i < 1; i++) {
      const componentRef: ComponentRef<CashComponent> = this.cashContainer.createComponent(ComponentToRender);

      // Posicionar el billete en una posición aleatoria en todo el ancho de la pantalla
      const xPos = Math.random() * (window.innerWidth -100);
      componentRef.location.nativeElement.style.position = 'absolute';
      componentRef.location.nativeElement.style.left = `${xPos}px`;
      componentRef.location.nativeElement.style.top = `-50px`; // Fuera de la pantalla

      // Eliminar el billete después de 5 segundos (duración de la animación)
      setTimeout(() => {
        componentRef.destroy();
      }, 4600);
    }
  }

  private getComponentToRender(): any {
    if (this._gameService.pointsPerClick > 1000) {
      return MoreMoreCashComponent;
    } else if (this._gameService.pointsPerClick > 100) {
      return MoreCashComponent;
    } else {
      return CashComponent;
    }
  }
}