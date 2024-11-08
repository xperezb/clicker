import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Log } from '../components/log/log.component';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logs: Log[] = [];
  public logs$ = new BehaviorSubject<Log[]>([]);
  private logId = 0;

  addLog(message: string) {
    const log: Log = { id: this.logId++, message };
    this.logs.push(log);
    this.logs$.next(this.logs);
  }

  clearLogs() {
    this.logs = [];
    this.logs$.next(this.logs);
  }
}
