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
  userRole: string | undefined;
  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userRole = this.userService.getUserRole();
    // console.log(payload);
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      // console.log(data);
    });
  }
  deleteCategory(id: string) {
    this.categories = this.categories.filter((item) => item._id !== id);
  }
}
