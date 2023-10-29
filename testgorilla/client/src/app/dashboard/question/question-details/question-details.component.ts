import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/interfaces/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styles: [],
})
export class QuestionDetailsComponent {
  questionId!: string;
  question!: Question;
  activeOption: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
  ) {}
  ngOnInit(): void {
    this.questionId = this.activatedRoute.snapshot.params['id'];
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
