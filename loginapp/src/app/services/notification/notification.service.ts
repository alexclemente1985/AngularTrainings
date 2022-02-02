import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public notification$: Subject<string> = new Subject();

  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) { }


  public openSnackBar(msg: string): void {
    this.zone.run(()=>{
      const snackBar = this.snackBar
      .open(
        msg,
        'OK',
        {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 2000
        });

      snackBar.onAction()
      .subscribe(
        ()=>{
          snackBar.dismiss()
        }
      )
      /* .pipe(
        switchMap(()=>{
          snackBar.dismiss()
        })
      ) */
    })
  }
}
