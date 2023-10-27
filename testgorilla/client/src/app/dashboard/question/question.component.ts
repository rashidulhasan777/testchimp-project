import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Question } from 'src/app/interfaces/question';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styles: [],
})
export class QuestionComponent {
  questions: Question[] = [];
  userRole: string | undefined;
  constructor(
    private questionService: QuestionService,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.getQuestions();
    this.userRole = this.userService.getUserRole();
  }
  getQuestions() {
    this.questionService.getQuestions().subscribe((questions) => {
      // console.log(questions);
      this.questions = questions;
    });
  }
  editQuestion(id: string) {
    // console.log(id);
    if (this.userRole === 'SUPER_ADMIN') {
      this.router.navigate(['/dashboard/questions/edit', id]);
    }
  }
  deleteQuestion(id: string) {
    if (this.userRole === 'SUPER_ADMIN') {
      const dialogRef = this.dialog.open(ConfirmPopupComponent, {
        width: '500px',
        height: '150px',
        data: {
          title: 'Delete Question',
          message: 'Are you sure you want to delete this question?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'yes') {
          // console.log('Yes clicked');
          this.questionService.deleteQuestionById(id).subscribe((_res) => {
            // console.log(res);
            this.getQuestions();
            // this.router.navigate(['/dashboard/tests']);
          });
        }
      });
    }
  }
}
