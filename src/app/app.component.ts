import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { Message } from './models/Message';
import { SocketIoService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nickname!: string;
  message!: string;
  messages: Message[] = [];
  private subscriptionMessages!: Subscription;
  private subscriptionList!: Subscription;

  @ViewChild(MatList, {read: ElementRef, static: true}) list!: ElementRef;
  @ViewChildren(MatListItem) listItems!: QueryList<MatListItem>

  constructor(
    private socketService: SocketIoService
  ){}

  ngOnInit(): void{
    this.subscriptionMessages = this.socketService.messages()
    .subscribe({
      next: (m: Message) => {
        this.messages.push(m)
      },
      error: (e) => console.log(e) 
    });
  }

  ngAfterViewInit(){
    this.subscriptionList = this.listItems.changes
    .subscribe({
      next: () =>{ 
        this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight;
      },
      error: (e) => console.log(e)
    })
  }


  send(){
    this.socketService.send({
      from: this.nickname,
      message: this.message
    });

    this.message = '';
  }

  ngOnDestroy(){
    this.subscriptionMessages.unsubscribe();
    this.subscriptionList.unsubscribe();
  }
}
