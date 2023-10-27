import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-assessment',
  templateUrl: './new-assessment.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
        margin-top: 10px;
      }
    `,
  ],
})
export class NewAssessmentComponent {
  timePeriods = [1, 2, 3, 4];
  isLinear = true;
  constructor(private builder: FormBuilder) { }
  questionForm = this.builder.group({
    assessmentName: this.builder.group({
      title: this.builder.control('', Validators.required),
      jobRole: this.builder.control('', Validators.required),
    }),
    selectTest: this.builder.group({}),
    address: this.builder.group({
      street: this.builder.control('', Validators.required),
      city: this.builder.control('', Validators.required),
      pin: this.builder.control('', Validators.required),
    }),
  });

  get assessmentNameForm() {
    return this.questionForm.get('assessmentName') as FormGroup;
  }
  get selectTestForm() {
    return this.questionForm.get('selectTest') as FormGroup;
  }
  get addressform() {
    return this.questionForm.get('address') as FormGroup;
  }

  onSubmit() {
    if (this.questionForm.valid) {
      console.log(this.questionForm.value);
    }
  }
  drop(event: any) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }
  deleteFromList(time: number) {
    console.log(time);
    this.timePeriods.splice(this.timePeriods.indexOf(time), 1);
  }
}
