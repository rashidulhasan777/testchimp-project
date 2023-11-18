import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestResult } from 'src/app/interfaces/candidate';
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
  loaded: boolean = false;
  @Input() parent!: string;
  @Output() submittedAnswerEvent = new EventEmitter<TestResult>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router,
  ) {
    this.router.events.subscribe((_event) => {
      if (this.router.url.includes('question')) {
        this.isQuestionPage = true;
        if (!this.loaded) {
          this.loadQuestion(this.question);
          this.loaded = true;
        }
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
          question.options = this.shuffle(question.options);
          question.title = question.title.replace('class="question-card"', '');
          this.question = question;
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }
  setActiveOption(option: string) {
    // console.log('called');

    this.activeOption = option;
    this.submittedAnswerEvent.emit({
      question: this.question._id,
      correctAnswer: this.question.answer,
      givenAnswer: this.activeOption,
    });
  }
  shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
