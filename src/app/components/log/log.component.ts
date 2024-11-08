import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class LogComponent implements OnInit, AfterViewInit {
  @ViewChild('logContainer') private logContainer!: ElementRef;
  logs$?: Observable<Log[]>;

  constructor(private _logService: LogService) { }

  ngOnInit(): void {
    this.logs$ = this._logService.logs$;
  }

  ngAfterViewInit() {
    this.logs$?.subscribe(() => {
      this.scrollToBottom();
    });
  }

  scrollToBottom(): void {
    this.logContainer!.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight;
  }
}


export interface Log {
  id: number;
  message: string;
}