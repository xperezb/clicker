import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logs: string[] = [];
  public logs$ = new BehaviorSubject<string[]>(this.logs);

  addLog(message: string) {
    this.logs.push(message);
    this.logs$.next(this.logs);
  }

  clearLogs() {
    this.logs = [];
    this.logs$.next(this.logs);
  }
}
