import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AssessmentComponent } from './dashboard/assessment/assessment.component';
import { NewAssessmentComponent } from './dashboard/assessment/new-assessment/new-assessment.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';

import { CategoryCardComponent } from './dashboard/category/category-card/category-card.component';
import { CategoryPopupComponent } from './dashboard/category/category-popup/category-popup.component';
import { CategoryComponent } from './dashboard/category/category.component';
import { NewCategoryComponent } from './dashboard/category/new-category/new-category.component';
import { ConfirmPopupComponent } from './dashboard/confirm-popup/confirm-popup.component';
import { NewQuestionComponent } from './dashboard/question/new-question/new-question.component';
import { QuestionCardComponent } from './dashboard/question/question-card/question-card.component';
import { QuestionDetailsComponent } from './dashboard/question/question-details/question-details.component';
import { QuestionComponent } from './dashboard/question/question.component';
import { MaterialModule } from './material.module';
import { PluralPipe } from './pipes/plural.pipe';
import { CategoryPreviewComponent } from './dashboard/category/category-preview/category-preview.component';
import { AssessmentDetailsComponent } from './dashboard/assessment/assessment-details/assessment-details.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { TesttakerComponent } from './testtaker/testtaker.component';
import { WebcamModule } from 'ngx-webcam';
import { TesttakerCamComponent } from './testtaker/testtaker-cam/testtaker-cam.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateTableComponent } from './candidate/candidate-table/candidate-table.component';
import { CandidateDetailsComponent } from './candidate/candidate-details/candidate-details.component';

// import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    PageNotFoundComponent,
    LoginComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    AssessmentComponent,
    RelativeTimePipe,
    NewAssessmentComponent,
    QuestionComponent,
    PluralPipe,
    NewQuestionComponent,
    QuestionDetailsComponent,
    QuestionCardComponent,
    CategoryComponent,
    NewCategoryComponent,
    CategoryCardComponent,
    ConfirmPopupComponent,
    CategoryPopupComponent,
    CategoryPreviewComponent,
    AssessmentDetailsComponent,
    TesttakerComponent,
    TesttakerCamComponent,
    CandidateComponent,
    CandidateTableComponent,
    CandidateDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CookieModule.withOptions(),
    BrowserAnimationsModule,
    MaterialModule,
    HotToastModule.forRoot(),
    WebcamModule,
  ],
  providers: [
    // { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
