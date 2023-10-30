import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/interfaces/question';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-preview',
  templateUrl: './category-preview.component.html',
  styleUrls: ['./category-preview.component.css'],
})
export class CategoryPreviewComponent implements OnInit {
  isLinear = true;
  questions: Question[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const categoryId = this.activatedRoute.snapshot.params['id'];

    this.categoryService
      .getQuestionsByCategoryId(categoryId)
      .subscribe((data) => {
        this.questions = data;
        console.log(this.questions);
      });
  }
  close() {
    window.close();
  }
  backClicked() {
    this.router.navigate(['/dashboard/tests']);
  }
}
