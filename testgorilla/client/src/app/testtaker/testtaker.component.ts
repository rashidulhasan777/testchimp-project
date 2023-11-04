import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AssessmentService } from '../services/assessment.service';
import { Question } from '../interfaces/question';

@Component({
  selector: 'app-testtaker',
  templateUrl: './testtaker.component.html',
  styleUrls: ['./testtaker.component.css'],
})
export class TesttakerComponent implements OnInit {
  testTakerIdentityForm!: FormGroup;
  formSubmitted = true;
  assessmentId!: string;
  isLinear = true;
  questions: Question[] = [];
  totalDuration: number = 0;
  totalDurationUnchanged: number = 0;
  timeLeftPercentage: number = 0;
  minutes!: number;
  seconds!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private assessmentService: AssessmentService,
  ) {
    this.testTakerIdentityForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
    });
  }

  ngOnInit(): void {
    this.assessmentId = this.activatedRoute.snapshot.params['id'];
    this.assessmentService
      .getAssessmentById(this.assessmentId)
      .subscribe((data) => {
        console.log(data);
        this.questions = data.questions as Question[];
        this.questions.forEach((question) => {
          this.totalDuration += question.duration;
        });
        this.totalDuration = this.totalDuration * 60;
        this.totalDurationUnchanged = this.totalDuration;

        const interval = setInterval(() => {
          this.minutes = Math.floor(this.totalDuration / 60);
          this.seconds = this.totalDuration - this.minutes * 60;
          this.timeLeftPercentage =
            100 - (this.totalDuration / this.totalDurationUnchanged) * 100;

          this.totalDuration--;
          if (this.totalDuration < 0) {
            clearInterval(interval);
            this.minutes = 0;
            this.seconds = 0;
          }
        }, 1000);
      });
  }

  saveIdentity() {
    if (this.testTakerIdentityForm.valid) {
      console.log(this.testTakerIdentityForm.value);
      this.formSubmitted = true;
    }
  }
  backClicked() {
    this.formSubmitted = false;
  }
}
