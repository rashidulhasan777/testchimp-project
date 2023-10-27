import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styles: [],
})
export class QuestionDetailsComponent {
  questionId!: string;
  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.questionId = this.activatedRoute.snapshot.params['id'];
  }
}
