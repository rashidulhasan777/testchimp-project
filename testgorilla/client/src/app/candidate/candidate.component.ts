import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from '../dashboard/confirm-popup/confirm-popup.component';
import { Candidate } from '../interfaces/candidate';
import { AssessmentService } from '../services/assessment.service';
import { CandidateService } from '../services/candidate.service';
import { UserService } from '../services/user.service';
import { Assessment } from '../interfaces/assessment';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styles: [],
})
export class CandidateComponent implements OnInit {
  candidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  assessments: Assessment[] = [];
  _assessmentId!: string;
  _searchByName!: string;
  _searchByEmail!: string;

  get searchByEmail(): string {
    return this._searchByEmail;
  }
  set searchByEmail(value: string) {
    this._searchByEmail = value;
    this.filteredCandidates = this.candidates.filter((candidate) => {
      return candidate.email.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

  get searchByName(): string {
    return this._searchByName;
  }
  set searchByName(value: string) {
    this._searchByName = value;
    this.filteredCandidates = this.candidates.filter((candidate) => {
      return candidate.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }
  get assessmentId(): string {
    return this._assessmentId;
  }
  set assessmentId(value: string) {
    this._assessmentId = value;
    // console.log(this._assessmentId);
    this.filteredCandidates = this.filterCandidate(value);
  }
  filterCandidate(assessmentId: string) {
    return this.candidates.filter((candidate) => {
      return candidate.assessment === assessmentId;
    });
  }
  constructor(
    private candidateService: CandidateService,
    private userService: UserService,
    private dialog: MatDialog,
    private assessmentService: AssessmentService,
  ) {}

  ngOnInit(): void {
    const userID: string | undefined = this.userService.getUserID();
    if (userID) {
      this.candidateService
        .getCandidateByAssignedBy(userID)
        .subscribe((candidates) => {
          this.candidates = candidates;
          // console.log(candidates);

          this.filteredCandidates = candidates;
        });
      this.assessmentService
        .getAssessmentByCreatedBy(userID)
        .subscribe((assessments) => {
          this.assessments = assessments;
        });
    }
  }

  deleteCandidate(id: string | undefined) {
    // console.log(id);
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      width: '550px',
      height: '150px',
      data: {
        title: 'Delete Candidate',
        message: 'Are you sure you want to delete this candidate?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        // console.log('Yes clicked');
        this.candidateService
          .deleteCandidateById(id as string)
          .subscribe((_res) => {
            // console.log(res);
            // this.deleteAssessmentEvent.emit(id);
            // this.router.navigate(['/dashboard/assessments']);
            this.candidates = this.candidates.filter(
              (candidate) => candidate._id !== id,
            );
          });
      }
    });
  }
}
