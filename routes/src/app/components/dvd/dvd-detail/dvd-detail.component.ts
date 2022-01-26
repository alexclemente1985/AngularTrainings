import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dvd } from 'src/app/models/dvd';
import { DvdService } from 'src/app/services/dvd/dvd.service';

@Component({
  selector: 'app-dvd-detail',
  templateUrl: './dvd-detail.component.html',
  styleUrls: ['./dvd-detail.component.scss']
})
export class DvdDetailComponent implements OnInit {

  dvd$!: Observable<Dvd | null>;
  title: string | null = null;
  paramIndex: number | null = -1;

  constructor(
    private route: ActivatedRoute,
    private dvdService: DvdService,
    private router: Router
    ) { }

  ngOnInit(): void {
   /*  console.log('Index: ', this.route.snapshot.paramMap.get('index'));
    this.route.paramMap
    .subscribe((params: ParamMap)=>console.log('Index paramMap: ', params.get('index'))) */


    //let index = +!this.route.snapshot.paramMap.get('index');

    //this.dvd$ = this.dvdService.get(index);
    this.route.paramMap
    .subscribe((params: ParamMap)=>{
      if(params.has('title')){
        this.title = params.get('title');

      }
      let indexTest = params.get('index');
      if(indexTest){
        this.paramIndex = parseInt(indexTest);
      }

      this.dvd$ = this.dvdService.get(this.paramIndex as number);
    });


  }

  goBack(){
    this.router.navigate(['/dvds']);
  }
}
