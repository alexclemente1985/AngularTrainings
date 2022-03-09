import { fromEvent, takeWhile } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit, AfterViewChecked {

  @ViewChild('myrect') myrect!: ElementRef;

  top: number = 40;
  left: number = 40;


  constructor() { }


  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    let mousedown = fromEvent<MouseEvent>(this.myrect.nativeElement, 'mousedown');
    let mousemove = fromEvent<MouseEvent>(document, 'mousemove');
    let mouseup = fromEvent<MouseEvent>(document, 'mouseup');

    mousedown
    .subscribe(
      {
        next: (ed) => {
          let x = ed.pageX;
          let y = ed.pageY;

          mousemove
          .pipe(
            takeUntil(mouseup)
          )
          .subscribe({
            next: (em) =>{
              console.log(em);
              let offsetx = x - em.clientX;
              let offsety = y - em.clientY;

              this.top -= offsety;
              this.left -= offsetx;

              x = em.clientX;
              y = em.clientY;

              console.log('posições finais: x -> ',x,' y -> ',y,' top -> ', this.top,' left -> ', this.left, ' offsetx -> ', offsetx, ' offsety -> ', offsety)
            }
          })
        }
      }
    )
  }



}
