import { Component } from '@angular/core';
import { FarmComponent } from './components/farm.component';

@Component({
  selector: 'app-empire-view',
  standalone: true,
  imports:  [FarmComponent],
  templateUrl: './empire-view.component.html',
  styleUrls: ['./empire-view.component.css'],
})
export class EmpireViewComponent { }