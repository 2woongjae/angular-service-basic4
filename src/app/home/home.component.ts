import { Component, OnInit, Inject } from '@angular/core';
import { LogService } from '../log.service';
import { FactoryService } from '../factory.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    LogService,
    {
      provide: 'githubUrl',
      useValue: 'https://api.github.com/users'
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

  data = [];

  constructor(
    @Inject('githubUrl') private githubUrl,
    @Inject('log') private logService,
    @Inject('factory') private factoryService,
    private http: Http
  ) { }

  ngOnInit() {
    this.logService.info(this.githubUrl);
    this.factoryService.log();
    this.http.get(this.githubUrl)
    .toPromise()
    .then(data => {
      this.data = data.json();
    })
    .catch(err => {
      console.log(err);
      this.data = [];
    });
  }

}
