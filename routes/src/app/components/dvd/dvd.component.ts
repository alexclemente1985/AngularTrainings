import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dvd } from 'src/app/models/dvd';
import { DvdService } from 'src/app/services/dvd/dvd.service';

@Component({
  selector: 'app-dvd',
  templateUrl: './dvd.component.html',
  styleUrls: ['./dvd.component.scss']
})
export class DvdComponent implements OnInit {

  dvds$!: Observable<Dvd[]>;

  constructor(
    private dvdService: DvdService
  ) { }

  ngOnInit(): void {
    this.dvds$ = this.dvdService.dvd$;
  }

  goDetails(i: number,dvd: Dvd){

  }
  remove(i: number){

  }

}
