import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AssessmentComponent } from './dashboard/assessment/assessment.component';
import { NewAssessmentComponent } from './dashboard/assessment/new-assessment/new-assessment.component';
import { CategoryComponent } from './dashboard/category/category.component';
import { NewCategoryComponent } from './dashboard/category/new-category/new-category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewQuestionComponent } from './dashboard/question/new-question/new-question.component';
import { QuestionDetailsComponent } from './dashboard/question/question-details/question-details.component';
import { QuestionComponent } from './dashboard/question/question.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryPreviewComponent } from './dashboard/category/category-preview/category-preview.component';
import { AssessmentDetailsComponent } from './dashboard/assessment/assessment-details/assessment-details.component';
import { TesttakerComponent } from './testtaker/testtaker.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateDetailsComponent } from './candidate/candidate-details/candidate-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'assessments',
        component: AssessmentComponent,
      },
      {
        path: 'assessments/new',
        component: NewAssessmentComponent,
      },
      {
        path: 'assessments/edit/:id',
        component: NewAssessmentComponent,
      },
      {
        path: 'assessments/:id',
        component: AssessmentDetailsComponent,
      },
      {
        path: 'questions',
        component: QuestionComponent,
      },
      {
        path: 'questions/new',
        component: NewQuestionComponent,
      },
      {
        path: 'questions/edit/:id',
        component: NewQuestionComponent,
      },
      {
        path: 'questions/:id',
        component: QuestionDetailsComponent,
      },
      {
        path: 'tests',
        component: CategoryComponent,
      },
      {
        path: 'tests/new',
        component: NewCategoryComponent,
      },
      {
        path: 'tests/edit/:id',
        component: NewCategoryComponent,
      },
      {
        path: 'preview/:id',
        component: CategoryPreviewComponent,
      },
      {
        path: 'candidates',
        component: CandidateComponent,
      },
      {
        path: 'candidates/:id',
        component: CandidateDetailsComponent,
      },
    ],
  },
  {
    path: 'testtaker/:id',
    component: TesttakerComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
