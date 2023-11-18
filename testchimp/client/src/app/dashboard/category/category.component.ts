import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  userRole: string | undefined;
  _searchCategory!: string;
  get searchCategory(): string {
    return this._searchCategory;
  }
  set searchCategory(value: string) {
    this._searchCategory = value;
    this.filteredCategories = this.filterCategory(value);
  }
  filterCategory(searchString: string) {
    return this.categories.filter((category) => {
      return (
        category.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
      );
    });
  }
  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userRole = this.userService.getUserRole();
    // console.log(payload);
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      this.filteredCategories = data;
      // console.log(data);
    });
  }
  deleteCategory(id: string) {
    this.filteredCategories = this.filteredCategories.filter(
      (item) => item._id !== id,
    );
  }
}
