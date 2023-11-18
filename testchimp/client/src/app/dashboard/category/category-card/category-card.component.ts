import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { ConfirmPopupComponent } from '../../confirm-popup/confirm-popup.component';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryPopupComponent } from '../category-popup/category-popup.component';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styles: [],
})
export class CategoryCardComponent {
  @Input() category!: Category;
  @Input() userRole!: string | undefined;
  @Input() parent: string | undefined;
  @Output() deleteCategoryEvent = new EventEmitter<string>();
  @Output() addButtonClickEvent = new EventEmitter<string>();
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private categoryService: CategoryService,
  ) {}
  editCategory(id: string | undefined) {
    // console.log(id);
    if (this.userRole === 'SUPER_ADMIN') {
      this.router.navigate(['/dashboard/tests/edit', id]);
    }
  }
  deleteCategory(id: string | undefined) {
    // console.log(id);
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      width: '500px',
      height: '150px',
      data: {
        title: 'Delete Category',
        message: 'Are you sure you want to delete this category?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        // console.log('Yes clicked');
        this.categoryService.deleteCategory(id as string).subscribe((_res) => {
          // console.log(res);
          this.deleteCategoryEvent.emit(id);
          // this.router.navigate(['/dashboard/tests']);
        });
      }
    });
  }
  showDetails() {
    // console.log(id);
    this.dialog.open(CategoryPopupComponent, {
      width: '90%',
      height: '90%',
      data: this.category,
    });
  }
  onClickAddButton() {
    this.addButtonClickEvent.emit(this.category._id);
  }
}
