import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RedirectDialog } from 'src/app/models/redirect-dialog';

@Component({
  selector: 'app-redirect-dialog',
  templateUrl: './redirect-dialog.component.html',
  styleUrls: ['./redirect-dialog.component.css'],
})
export class RedirectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RedirectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RedirectDialog
  ) {}
}
