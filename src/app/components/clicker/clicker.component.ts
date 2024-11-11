import { Component, ComponentRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CashComponent } from '../cash/cash.component';
import { MoreCashComponent } from '../more-cash/more-cash.component';
import { MoreMoreCashComponent } from '../more-more-cash/more-more-cash.component';
import { AssaultComponent } from '../empire-view/components/assault/assault.component';
import { Attack } from '../../interfaces/attack';

@Component({
  selector: 'app-clicker',
  standalone: true,
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.css'],
})
export class ClickerComponent implements OnInit, OnDestroy {
  @ViewChild('cashContainer', { read: ViewContainerRef }) cashContainer!: ViewContainerRef;
  private attackEventSubscription: any;
  isAttackInProgress: boolean = false; // Estado del botón de click

  constructor(private _gameService: GameService) {}

  ngOnInit() {
    // Escuchamos el evento attackEvent$ y mostramos las sirenas
    this.attackEventSubscription = this._gameService.attackEvent$.subscribe((attack) => {
      this.isAttackInProgress = true;
      this.createRaidIcons(attack, 50); // Mostrar 50 sirenas de policía cuando se dispare un ataque
    });
  }

  ngOnDestroy() {
    // Asegúrate de desuscribirte para evitar fugas de memoria
    if (this.attackEventSubscription) {
      this.attackEventSubscription.unsubscribe();
    }
  }

  private createRaidIcons(attack: Attack ,count: number): void {
    for (let i = 0; i < count; i++) {
      if (attack.icon) {
        const componentRef: ComponentRef<any> = this.cashContainer.createComponent(attack.icon);
      
        // Posicionar la sirena en una posición aleatoria en todo el ancho de la pantalla
        const xPos = Math.random() * (window.innerWidth - 100);
        const yPos = Math.random() * (window.innerHeight - 100); // También aleatorio en el eje Y
        componentRef.location.nativeElement.style.position = 'absolute';
        componentRef.location.nativeElement.style.left = `${xPos}px`;
        componentRef.location.nativeElement.style.top = `${yPos}px`; // Posición aleatoria verticalmente

        // Eliminar la sirena después de 5 segundos
        setTimeout(() => {
          componentRef.destroy();
          this.isAttackInProgress = false;
        }, 10000); // Duración de la sirena
      }
    }
}

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