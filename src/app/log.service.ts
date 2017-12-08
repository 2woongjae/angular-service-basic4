import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  constructor() { }

  public info(message: string): void {
    console.log('info', message);
  }

}
