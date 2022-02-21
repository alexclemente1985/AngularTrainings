import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as currencyFormater from 'currency-formatter'
import { Category } from '../../categories/shared/models/category.model';
import { CategoryService } from '../../categories/shared/services/category.service';
import { Entry } from '../../entries/shared/models/entry.model';
import { EntryService } from '../../entries/shared/services/entry.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    scales: {
      yAxis: [{
        ticks: {
            beginAtZero: true
          }
      }
      ]
    }
  }

  categories: Category[] = [];
  entries: Entry[] = [];


  @ViewChild('month') month: ElementRef | null = null;
  @ViewChild('year') year: ElementRef | null = null;

  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll()
    .subscribe({
      next: (categories => this.categories = categories)
    }
    )
  }

  generateReports(){
    const month = this.month?.nativeElement.value;
    const year = this.year?.nativeElement.value;

    if(!month || !year){
      alert('Você precisa selecionar Mês e Ano para gerar os relatórios');
    }
    else {
      this.entryService.getByMonthAndYear(month, year)
      .subscribe({
        next: () => {}
      });
    }
  }

}
