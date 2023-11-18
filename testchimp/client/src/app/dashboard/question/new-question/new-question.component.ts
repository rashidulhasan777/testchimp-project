import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
        margin-top: 10px;
      }
    `,
  ],
})
export class NewQuestionComponent implements OnInit {
  categories: Category[] = [];
  questionForm!: FormGroup;
  currentRoute!: string;
  updateMode: boolean = false;
  questionId!: string;
  firstLoad: boolean = true;
  userRole: string | undefined;
  constructor(
    private categoryService: CategoryService,
    private questionService: QuestionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.questionId = this.activatedRoute.snapshot.params['id'];
    if (this.questionId) {
      this.updateMode = true;
    }
    this.userRole = this.userService.getUserRole();

    this.questionForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      option1: new FormControl(null, Validators.required),
      option2: new FormControl(null, Validators.required),
      option3: new FormControl(null),
      option4: new FormControl(null),
      answer: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      level: new FormControl(null, Validators.required),
      duration: new FormControl(null, Validators.required),
    });
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    if (this.questionId && this.userRole === 'SUPER_ADMIN') {
      this.questionService
        .getQuestionById(this.questionId)
        .subscribe((question) => {
          // console.log(question);
          this.questionForm = new FormGroup({
            title: new FormControl(question.title, Validators.required),
            option1: new FormControl(question.options[0], Validators.required),
            option2: new FormControl(question.options[1], Validators.required),
            option3: new FormControl(question.options[2]),
            option4: new FormControl(question.options[3]),
            answer: new FormControl(question.answer, Validators.required),
            category: new FormControl(
              question.category[0]._id,
              Validators.required,
            ),
            level: new FormControl(question.level, Validators.required),
            duration: new FormControl(question.duration, Validators.required),
          });
        });
    } else if (this.questionId && this.userRole !== 'SUPER_ADMIN') {
      this.router.navigate(['/dashboard/questions']);
    }
  }
  getFormData() {
    const options = [
      this.questionForm.value.option1,
      this.questionForm.value.option2,
      this.questionForm.value.option3,
      this.questionForm.value.option4,
    ];
    const question: any = {
      title: this.questionForm.value.title,
      options: options.filter((option) => option !== null),
      answer: this.questionForm.value.answer,
      category: this.questionForm.value.category,
      level: this.questionForm.value.level,
      duration: this.questionForm.value.duration,
    };
    return question;
  }
  onSubmit() {
    if (this.questionForm.valid) {
      // console.log(this.questionForm.value);
      if (this.updateMode && this.userRole === 'SUPER_ADMIN') {
        const question = this.getFormData();
        // console.log(question);
        this.questionService
          .updateQuestionById(this.questionId, question)
          .subscribe((question) => {
            console.log(question);
            this.questionForm.reset();
            this.router.navigate(['/dashboard/questions']);
          });
      } else {
        const question = this.getFormData();
        // console.log(question);
        this.questionService.createQuestion(question).subscribe((question) => {
          console.log(question);
          this.questionForm.reset();
          this.router.navigate(['/dashboard/questions']);
        });
      }
    }
  }
}
