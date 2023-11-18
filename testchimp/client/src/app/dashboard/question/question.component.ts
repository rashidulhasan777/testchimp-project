import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';

import { Question } from 'src/app/interfaces/question';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: [],
})
export class QuestionComponent {
  questions: Question[] = [];
  categories: Category[] = [];
  filteredQuestions: Question[] = [];
  userRole: string | undefined;
  _searchByCategory!: string;
  page!: number;
  lastPage!: number;
  limit!: number;
  total!: number;

  get searchByCategory(): string {
    return this._searchByCategory;
  }
  set searchByCategory(value: string) {
    this._searchByCategory = value;
    // console.log(value);

    this.filteredQuestions = this.filterQuestion(value);
  }
  filterQuestion(categoryId: string) {
    return this.questions.filter((question) => {
      return question.category[0]._id === categoryId;
    });
  }
  constructor(
    private questionService: QuestionService,
    private userService: UserService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.page = params['page'] || 1;
      this.limit = params['limit'] || 10;
    });
  }
  ngOnInit(): void {
    this.getQuestions(this.page, this.limit);
    this.userRole = this.userService.getUserRole();
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  getQuestions(page: number, limit: number) {
    this.questionService.getQuestions(page, limit).subscribe((response) => {
      // console.log(questions);
      if (response.length > 0) {
        this.questions = response.data;
        this.filteredQuestions = response.data;
        this.total = response.total;
        this.lastPage = Math.ceil(this.total / this.limit);
        // console.log(this.page, this.limit, this.total, this.lastPage);
      }
    });
  }

  deleteQuestion(id: string) {
    // console.log(id);
    this.questionService.deleteQuestionById(id).subscribe((_res) => {
      this.getQuestions(this.page, this.limit);
    });
  }

  changeRouteWithQueryParams() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.page, limit: this.limit },
      queryParamsHandling: 'merge',
    });
  }
  previousPage() {
    this.page--;
    this.getQuestions(this.page, this.limit);
    this.changeRouteWithQueryParams();
  }
  nextPage() {
    this.page++;
    this.getQuestions(this.page, this.limit);
    this.changeRouteWithQueryParams();
  }
  firstPage() {
    this.page = 1;
    this.getQuestions(this.page, this.limit);
    this.changeRouteWithQueryParams();
  }
  lastPageFunc() {
    this.page = this.lastPage;
    this.getQuestions(this.page, this.limit);
    this.changeRouteWithQueryParams();
  }
}
