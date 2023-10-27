import { Component, OnInit } from '@angular/core';
import { Assessment } from '../../interfaces/assessment';
import { AssessmentService } from '../../services/assessment.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styles: [],
})
export class AssessmentComponent implements OnInit {
  assessments: Assessment[] = [];
  constructor(private assessmentService: AssessmentService) {}
  ngOnInit(): void {
    this.assessmentService.getAssessments().subscribe((assessments) => {
      this.assessments = assessments;
      // this.assessments = [];
      // console.log(this.assessments);
    });
  }
}
