import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-empire-view',
  standalone: true,
  templateUrl: './empire-view.component.html',
  styleUrls: ['./empire-view.component.css'],
})
export class EmpireViewComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawDotSubscription!: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.drawDotSubscription = this.gameService.drawDot$.subscribe(({ x, y }) => {
      this.drawBlackDot(x, y);
    });
  }

  ngAfterViewInit() {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context) {
      this.ctx = context;
    } else {
      throw new Error('Failed to get 2D context');
    }
  }

  ngOnDestroy() {
    if (this.drawDotSubscription) {
      this.drawDotSubscription.unsubscribe();
    }
  }

  drawBlackDot(x: number, y: number) {
    if (this.ctx) {
      this.ctx.fillStyle = 'black';
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0, Math.PI * 2, true);
      this.ctx.fill();
    }
  }
}