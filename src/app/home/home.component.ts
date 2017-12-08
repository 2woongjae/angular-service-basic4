import { Component, OnInit, Inject } from '@angular/core';
import { LogService } from '../log.service';
import { FactoryService } from '../factory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    LogService,
    {
      provide: 'githubUrl',
      useValue: 'https://github.com'
    },
    {
      provide: 'log',
      useExisting: LogService
    },
    {
      provide: 'factory',
      useFactory: (logService) => {
        return new FactoryService(logService, true);
      },
      deps: [LogService]
    }
  ]
})
export class HomeComponent implements OnInit {

  constructor(
    @Inject('githubUrl') private githubUrl,
    @Inject('log') private logService,
    @Inject('factory') private factoryService
  ) { }

  ngOnInit() {
    console.log(this.githubUrl);
    this.logService.info('안녕하세요');
    this.factoryService.log();
  }

}
