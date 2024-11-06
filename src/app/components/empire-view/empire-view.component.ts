import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';
import { FarmComponent } from './components/farm.component';

@Component({
  selector: 'app-empire-view',
  standalone: true,
  imports:  [FarmComponent],
  templateUrl: './empire-view.component.html',
  styleUrls: ['./empire-view.component.css'],
})
export class EmpireViewComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true, read: ViewContainerRef })
  canvasContainer!: ViewContainerRef;
  private drawDotSubscription!: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.drawDotSubscription = this.gameService.drawDot$.subscribe(({ x, y }) => {
      this.addFarmComponent(x, y);
    });
  }

  ngOnDestroy() {
    if (this.drawDotSubscription) {
      this.drawDotSubscription.unsubscribe();
    }
  }

  addFarmComponent(x: number, y: number) {
    const componentRef = this.canvasContainer.createComponent(FarmComponent);
    const element = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    element.style.position = 'relative';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  }
}