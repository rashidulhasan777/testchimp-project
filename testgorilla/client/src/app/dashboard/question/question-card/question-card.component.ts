import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Question } from 'src/app/interfaces/question';
import { ConfirmPopupComponent } from '../../confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styles: [],
})
export class QuestionCardComponent implements OnInit {
  @Input() question!: Question;
  @Input() userRole: string | undefined;
  @Output() deleteQuestionEvent = new EventEmitter<string>();
  @Output() addQuestionEvent = new EventEmitter<string>();
  @Input() parent!: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

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
          this.deleteQuestionEvent.emit(id);
        }
      });
    }
  }
  onClickAddButton(id: string) {
    this.addQuestionEvent.emit(id);
  }
}
