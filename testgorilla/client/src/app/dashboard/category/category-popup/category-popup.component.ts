import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-category-popup',
  templateUrl: './category-popup.component.html',
  styles: [],
})
export class CategoryPopupComponent implements OnInit {
  inputData: Category | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.inputData = this.data;
    // console.log(this.inputData);
  }
}
