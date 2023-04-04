import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RedirectDialog } from 'src/app/models/redirect-dialog';

@Component({
  selector: 'app-cart-discard-dialog',
  templateUrl: './cart-discard-dialog.component.html',
  styleUrls: ['./cart-discard-dialog.component.css'],
})
export class CartDiscardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CartDiscardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RedirectDialog
  ) {}
}
