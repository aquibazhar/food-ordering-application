import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAddress } from 'src/app/models/user-address';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.css'],
})
export class SelectAddressComponent {
  selectedAddress: number = 0;

  constructor(
    private dialogRef: MatDialogRef<SelectAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedAddress = data.selectedAddress;
  }

  onSelect() {
    this.dialogRef.close(this.selectedAddress);
  }
}
