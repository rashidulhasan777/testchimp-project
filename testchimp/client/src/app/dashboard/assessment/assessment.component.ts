import { Component, OnInit } from '@angular/core';
import { Assessment } from '../../interfaces/assessment';
import { AssessmentService } from '../../services/assessment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styles: [],
})
export class AssessmentComponent implements OnInit {
  assessments: Assessment[] = [];
  filteredAssessments: Assessment[] = [];
  _searchAssessment!: string;
  get searchAssessment(): string {
    return this._searchAssessment;
  }
  set searchAssessment(value: string) {
    this._searchAssessment = value;
    this.filteredAssessments = this.filterAssessment(value);
  }
  constructor(
    private assessmentService: AssessmentService,
    private userService: UserService,
  ) {}
  ngOnInit(): void {
    const userId = this.userService.getUserID();
    this.assessmentService
      .getAssessmentByCreatedBy(userId as string)
      .subscribe((assessments) => {
        this.assessments = assessments;
        this.filteredAssessments = assessments;
        // console.log(assessments);
      });
  }
  filterAssessment(searchString: string) {
    return this.assessments.filter((assessment) => {
      return (
        assessment.title.toLowerCase().indexOf(searchString.toLowerCase()) !==
        -1
      );
    });
  }
}
