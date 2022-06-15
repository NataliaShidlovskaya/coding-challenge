import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor (private snackBar: MatSnackBar) { }

  openSnackBar (message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    })
  }
}
