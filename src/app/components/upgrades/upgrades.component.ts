import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upgrades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upgrades.component.html',
  styleUrl: './upgrades.component.css'
})
export class UpgradesComponent {
  @Input() title: string = '';
  @Input() items$?: Observable<any[]>;
  @Input() points$?: Observable<number>;
  @Input() totalPoints$?: Observable<number>;
  @Input() measure: string = '';
  @Input() countRight?: boolean;
  @Input() height: string = '400px';
  @Input() buyItem: (id: number) => void = () => {};
}
