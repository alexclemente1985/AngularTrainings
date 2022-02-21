import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as currencyFormatter from 'currency-formatter'
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
        next: this.setValues.bind(this)
      });
    }
  }

  private setValues(entries: Entry[]){
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance(){
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(e => {
      if(e.type == 'revenue'){
        revenueTotal += currencyFormatter.unformat(e.amount as string, {code: 'BRL'});
      }
      else {
        expenseTotal += currencyFormatter.unformat(e.amount as string, {code: 'BRL'});
      }
    })

    this.expenseTotal = currencyFormatter.format(expenseTotal, {code: 'BRL'});
    this.revenueTotal = currencyFormatter.format(revenueTotal, {code: 'BRL'});
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, {code: 'BRL'});
  }

  private setChartData(){
    this.revenueChartData = this.getChartData('revenue', 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData('expense', 'Gráfico de Despesas', '#E03131');
  }

  private getChartData(entryType: string, title: string, color: string){
    const chartData: { categoryName: string | undefined; totalAmount: number; }[] = [];

    this.categories.forEach(c =>{
      const filteredEntries = this.entries.filter(
        e => e.categoryId == c.id && e.type == entryType
      );

      if(filteredEntries.length > 0){
        const totalAmount = filteredEntries.reduce(
          (total,entry) => total + currencyFormatter.unformat(entry.amount as string, {code: 'BRL'}), 0
        );

        chartData.push({
          categoryName: c.name,
          totalAmount
        })
      }
    });

   return {
      labels: chartData.map(cData => cData.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(cData => cData.totalAmount)
      }]
    }
  }

}
