import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Assessment } from 'src/app/interfaces/assessment';
import { Category } from 'src/app/interfaces/category';
import { Question } from 'src/app/interfaces/question';
import { AssessmentService } from 'src/app/services/assessment.service';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-new-assessment',
  templateUrl: './new-assessment.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
        margin-top: 10px;
      }
    `,
  ],
})
export class NewAssessmentComponent implements OnInit {
  isLinear = true;
  allCategories: Category[] = [];
  selectedCategories: Category[] = [];
  allQuestions: Question[] = [];
  selectedQuestions: Question[] = [];
  constructor(
    private builder: FormBuilder,
    private categoryService: CategoryService,
    private questionService: QuestionService,
    private assessmentService: AssessmentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.allCategories = data;
      // console.log(data);
    });
    this.questionService.getQuestions().subscribe((data) => {
      this.allQuestions = data;
    });
  }
  questionForm = this.builder.group({
    assessmentName: this.builder.group({
      title: this.builder.control('', Validators.required),
      jobRole: this.builder.control('', Validators.required),
    }),
  });

  get assessmentNameForm() {
    return this.questionForm.get('assessmentName') as FormGroup;
  }
  // get selectTestForm() {
  //   return this.questionForm.get('selectTest') as FormGroup;
  // }
  // get review() {
  //   return this.questionForm.get('review') as FormGroup;
  // }

  onSubmit() {
    if (this.questionForm.valid) {
      const questions: string[] = [];
      this.selectedQuestions.forEach((question) => {
        questions.push(question._id);
      });

      this.questionService
        .getQuestionByCategory(this.selectedCategories.map((cat) => cat._id))
        .subscribe((data) => {
          data.forEach((questionId) => {
            questions.push(questionId);
          });
        });
      const assessmentObject: Assessment = {
        title: this.questionForm.value.assessmentName?.title as string,
        jobRole: this.questionForm.value.assessmentName?.jobRole as string,
        questions: questions,
      };
      // assessmentObject.questions = questions;
      console.log(assessmentObject);
      this.assessmentService
        .createAssessment(assessmentObject)
        .subscribe((_data) => {
          // console.log(data);
          this.router.navigate(['/dashboard/assessments']);
        });
    }
  }
  drop(event: any) {
    moveItemInArray(
      this.selectedCategories,
      event.previousIndex,
      event.currentIndex,
    );
  }
  deleteFromSelectedCategories(id: string | undefined) {
    this.allCategories.push(
      this.selectedCategories.find((cat) => cat._id === id) as Category,
    );
    this.selectedCategories.splice(
      this.selectedCategories.findIndex((cat) => cat._id === id),
      1,
    );
  }
  onCategoryAddButtonClick(id: string) {
    this.selectedCategories.push(
      this.allCategories.find((cat) => cat._id === id) as Category,
    );
    // console.log(this.selectedCategories);

    this.allCategories.splice(
      this.allCategories.findIndex((cat) => cat._id === id),
      1,
    );
  }
  onQuestionAddButtonClick(id: string) {
    this.selectedQuestions.push(
      this.allQuestions.find((question) => question._id === id) as Question,
    );

    this.allQuestions.splice(
      this.allQuestions.findIndex((question) => question._id === id),
      1,
    );
  }
  deleteFromSelectedQuestions(id: string | undefined) {
    this.allQuestions.push(
      this.selectedQuestions.find(
        (question) => question._id === id,
      ) as Question,
    );
    this.selectedQuestions.splice(
      this.selectedQuestions.findIndex((question) => question._id === id),
      1,
    );
  }
}
