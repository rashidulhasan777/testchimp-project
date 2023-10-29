import { Component } from '@angular/core';

import { Question } from 'src/app/interfaces/question';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService,
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

  deleteQuestion(id: string) {
    // console.log(id);
    this.questionService.deleteQuestionById(id).subscribe((_res) => {
      this.getQuestions();
    });
  }
}
