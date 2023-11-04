import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/interfaces/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styles: [],
})
export class QuestionDetailsComponent {
  questionId!: string;
  @Input() question!: Question;
  activeOption: string = '';
  isQuestionPage: boolean = false;
  @Input() parent!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router,
  ) {
    this.router.events.subscribe((_event) => {
      if (this.router.url.includes('question')) {
        this.isQuestionPage = true;
        this.loadQuestion(this.question);
      } else {
        this.isQuestionPage = false;
      }
    });
  }
  ngOnInit(): void {}
  loadQuestion(question: Question) {
    if (!question) {
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
  }
  setActiveOption(option: string) {
    this.activeOption = option;
  }
}
