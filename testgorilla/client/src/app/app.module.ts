import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AssessmentComponent } from './dashboard/assessment/assessment.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewAssessmentComponent } from './dashboard/new-assessment/new-assessment.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { NewQuestionComponent } from './dashboard/question/new-question/new-question.component';
import { QuestionComponent } from './dashboard/question/question.component';
import { PluralPipe } from './pipes/plural.pipe';
import { QuestionDetailsComponent } from './dashboard/question/question-details/question-details.component';
import { QuestionCardComponent } from './dashboard/question/question-card/question-card.component';
import { CategoryComponent } from './dashboard/category/category.component';
import { NewCategoryComponent } from './dashboard/category/new-category/new-category.component';
import { CategoryCardComponent } from './dashboard/category/category-card/category-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmPopupComponent } from './dashboard/confirm-popup/confirm-popup.component';
import { CategoryPopupComponent } from './dashboard/category/category-popup/category-popup.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CookieModule.withOptions(),
    BrowserAnimationsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    DragDropModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
