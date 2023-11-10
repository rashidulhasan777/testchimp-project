import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  questionForm!: FormGroup;
  updateMode: boolean = false;
  assessmentId!: string;
  constructor(
    private builder: FormBuilder,
    private categoryService: CategoryService,
    private questionService: QuestionService,
    private assessmentService: AssessmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.assessmentId = this.activatedRoute.snapshot.params['id'];
    this.categoryService.getCategories().subscribe((data) => {
      this.allCategories = data;
      // console.log(data);
    });
    this.questionService.getQuestions(1, 10).subscribe((response) => {
      this.allQuestions = response.data;
    });

    this.questionForm = this.builder.group({
      assessmentName: this.builder.group({
        title: this.builder.control('', Validators.required),
        jobRole: this.builder.control('', Validators.required),
        deadline: this.builder.control(''),
      }),
    });

    if (this.assessmentId) {
      this.assessmentService
        .getAssessmentById(this.assessmentId)
        .subscribe((data) => {
          this.questionForm = this.builder.group({
            assessmentName: this.builder.group({
              title: this.builder.control(data.title, Validators.required),
              jobRole: this.builder.control(data.jobRole, Validators.required),
              deadline: this.builder.control(data.deadline),
            }),
          });
          this.selectedCategories = data.categories as Category[];
          this.selectedQuestions = data.questions as Question[];
          this.updateMode = true;
        });
    }
  }

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
      let questions: string[] = [];
      this.selectedQuestions.forEach((question) => {
        questions.push(question._id);
      });

      this.questionService
        .getQuestionByCategory(this.selectedCategories.map((cat) => cat._id))
        .subscribe((data) => {
          data.forEach((questionId) => {
            questions.push(questionId);
          });
          questions = questions.filter(
            (item, index) => questions.indexOf(item) === index,
          );
          const assessmentObject: Assessment = {
            title: this.questionForm.value.assessmentName?.title as string,
            jobRole: this.questionForm.value.assessmentName?.jobRole as string,
            deadline: this.questionForm.value.assessmentName
              ?.deadline as string,
            questions: questions,
            categories: this.selectedCategories.map((cat) => cat._id as string),
          };
          if (this.updateMode) {
            this.assessmentService
              .updateAssessment(this.assessmentId, assessmentObject)
              .subscribe((_data) => {
                // console.log(data);
                this.router.navigate(['/dashboard/assessments']);
              });
            return;
          } else {
            this.assessmentService
              .createAssessment(assessmentObject)
              .subscribe((_data) => {
                // console.log(data);
                this.router.navigate(['/dashboard/assessments']);
              });
          }
        });

      // assessmentObject.questions = questions;
      // console.log(assessmentObject);
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
