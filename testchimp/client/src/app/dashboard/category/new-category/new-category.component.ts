import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
        margin-top: 10px;
      }
    `,
  ],
})
export class NewCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  updateMode: boolean = false;
  categoryId!: string;
  userRole: string | undefined;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.params['id'];
    if (this.categoryId) {
      this.updateMode = true;
    }
    this.userRole = this.userService.getUserRole();

    this.categoryForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      shortDescription: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      skills: new FormControl(null, Validators.required),
      level: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      relevantRoles: new FormControl(null, Validators.required),
    });
    if (this.categoryId && this.userRole === 'SUPER_ADMIN') {
      this.categoryService
        .getCategoryById(this.categoryId)
        .subscribe((category) => {
          this.categoryForm = new FormGroup({
            title: new FormControl(category.title, Validators.required),
            shortDescription: new FormControl(
              category.shortDescription,
              Validators.required,
            ),
            description: new FormControl(
              category.description,
              Validators.required,
            ),
            skills: new FormControl(
              category.skills.join(','),
              Validators.required,
            ),
            level: new FormControl(category.level, Validators.required),
            type: new FormControl(category.type, Validators.required),
            relevantRoles: new FormControl(
              category.relevantRoles,
              Validators.required,
            ),
          });
        });
    } else if (this.updateMode && this.userRole !== 'SUPER_ADMIN') {
      this.router.navigate(['/dashboard/tests']);
    }
  }

  getFormData() {
    const category = {
      title: this.categoryForm.value.title,
      shortDescription: this.categoryForm.value.shortDescription,
      description: this.categoryForm.value.description,
      skills: this.categoryForm.value.skills.split(','),
      level: this.categoryForm.value.level,
      type: this.categoryForm.value.type,
      relevantRoles: this.categoryForm.value.relevantRoles,
    };
    return category;
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      // console.log(this.categoryForm.value);
      const category = this.getFormData();
      if (this.updateMode && this.userRole === 'SUPER_ADMIN') {
        // console.log('super admin');
        // console.log(category);
        this.categoryService
          .updateCategory(this.categoryId, category)
          .subscribe((_response) => {
            // console.log(_response);
            this.categoryForm.reset();
            this.router.navigate(['/dashboard/tests']);
          });
      } else if (this.updateMode && this.userRole !== 'SUPER_ADMIN') {
        this.router.navigate(['/dashboard/tests']);
      } else {
        this.categoryService.createCategory(category).subscribe((_response) => {
          // console.log(response);
          this.categoryForm.reset();
          this.router.navigate(['/dashboard/tests']);
        });
      }
    }
  }
}
