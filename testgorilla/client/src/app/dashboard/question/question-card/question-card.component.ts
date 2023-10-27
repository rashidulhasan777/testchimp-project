import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/interfaces/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styles: [],
})
export class QuestionCardComponent implements OnInit {
  @Input() questionId!: string;
  question!: Question;
  activeOption: string = '';

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestionById(this.questionId).subscribe(
      (question) => {
        // console.log(question);
        this.question = question;
      },
      (err) => {
        console.log(err);
      },
    );
  }
  setActiveOption(option: string) {
    this.activeOption = option;
  }
}
