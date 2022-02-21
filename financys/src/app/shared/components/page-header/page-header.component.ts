import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input('page-title') pageTitle: string;
  @Input('button-class') buttonClass: string;
  @Input('button-text') buttonText: string;
  @Input('button-link') buttonLink: string;
  @Input('show-button') showButton: boolean;

  constructor() {
    this.pageTitle = "";
    this.buttonClass = "";
    this.buttonText = "";
    this.buttonLink = "";
    this.showButton = true;
   }

  ngOnInit(): void {
  }

}
