import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styles: [],
})
export class ConfirmPopupComponent implements OnInit {
  inputData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.inputData = this.data;
  }
}
