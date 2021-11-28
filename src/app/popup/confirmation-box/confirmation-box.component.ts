import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss']
})
export class ConfirmationBoxComponent implements OnInit {

  writeup = '';

  constructor(public dialogRef: MatDialogRef<ConfirmationBoxComponent>, @Inject(MAT_DIALOG_DATA) public receivedData: any) {
    this.writeup = receivedData;
  }

  ngOnInit() {
  }

  onOk() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}
