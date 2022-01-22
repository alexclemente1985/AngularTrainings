import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { DataModel } from '../../interfaces/datamodel';
import { GenRandomDataService } from '../../services/gen-random-data.service';

@Component({
  selector: 'app-rxjs-subjects',
  templateUrl: './rxjs-subjects.component.html',
  styleUrls: ['./rxjs-subjects.component.scss']
})
export class RxjsSubjectsComponent implements OnInit {

  /* private */ subject: Subject<DataModel>;
  /* private */ replaySubject: ReplaySubject<DataModel>;
  /* private */ asyncSubject: AsyncSubject<DataModel>;
  /* private */ behaviorSubject: BehaviorSubject<DataModel>;
  constructor(private dataService: GenRandomDataService) { }

  ngOnInit(): void {
    this.subject = new Subject<DataModel>();
    this.replaySubject = new ReplaySubject<DataModel>();
    this.asyncSubject = new AsyncSubject<DataModel>();
    this.behaviorSubject = new BehaviorSubject<DataModel>({timestamp: 0, data: 0});

    this.dataService.dataObservable.subscribe(this.subject);
    this.dataService.dataObservable.subscribe(this.replaySubject);
    this.dataService.dataObservable.subscribe(this.asyncSubject);
    this.dataService.dataObservable.subscribe(this.behaviorSubject);
  }

  connect(){
    this.dataService.dataObservable.connect();
  }
}
