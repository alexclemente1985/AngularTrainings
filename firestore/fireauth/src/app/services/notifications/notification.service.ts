import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  notificationHandler(msg: string){
    return this.snackBar.open(msg, 'OK', {duration: 2000});
  }
}
