import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent implements OnInit {
  @ViewChild('logContainer') private logContainer!: ElementRef;
  logs$?: Observable<string[]>;

  constructor(private _logService: LogService) { }

  ngOnInit(): void {
    this.logs$ = this._logService.logs$;

    this.logs$.subscribe(() => {
      this.scrollToBottom();
    });
  }

  scrollToBottom(): void {
    this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight;
  }

}
