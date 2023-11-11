import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Assessment } from 'src/app/interfaces/assessment';
import { AssessmentService } from 'src/app/services/assessment.service';
import { EmailService } from 'src/app/services/email.service';
import { ConfirmPopupComponent } from '../../confirm-popup/confirm-popup.component';
import { Candidate } from 'src/app/interfaces/candidate';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-assessment-details',
  templateUrl: './assessment-details.component.html',
  styles: [],
})
export class AssessmentDetailsComponent implements OnInit {
  assessmentLink: string = 'https://testchimp.me/testtaker/';
  assessment!: Assessment;
  candidates: Candidate[] = [];
  emailForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  // firstName = new FormControl('', Validators.required);
  // lastName = new FormControl('', Validators.required);
  // email = new FormControl('', [Validators.required, Validators.email]);
  constructor(
    private assessmentService: AssessmentService,
    private activatedRoute: ActivatedRoute,
    private clipboard: Clipboard,
    private toast: HotToastService,
    private emailService: EmailService,
    private dialog: MatDialog,
    private router: Router,
    private candidateService: CandidateService,
  ) {}

  ngOnInit(): void {
    const assessmentId = this.activatedRoute.snapshot.params['id'];
    // console.log(assessmentId);

    this.assessmentLink += assessmentId;
    this.assessmentService
      .getAssessmentById(assessmentId)
      .subscribe((response) => {
        // console.log(response);
        this.assessment = response;
      });
    this.candidateService
      .getCandidateByAssessment(assessmentId)
      .subscribe((response) => {
        // console.log(response);
        this.candidates = response;
      });
  }
  backClicked() {
    window.history.back();
  }
  onSubmit() {
    if (this.emailForm.valid) {
      // console.log(this.emailForm.value);

      const subject = 'Invitation To Take a Test';

      const message = `
        Hello ${this.emailForm.value.firstName} ${this.emailForm.value.lastName},
          You have been invited to take a test.
          Please click on the link below to take the test.
          ${this.assessmentLink}

          Thanks,
          Md Rashidul Hasan
        `;
      this.emailService
        .sendEmail(this.emailForm.value.email as string, subject, message)
        .subscribe((_response) => {
          // console.log(response);
          this.toast.success('Email Sent', {
            icon: '👏',
            style: {
              background: '#51A150',
              color: '#fff',
            },
          });
          this.emailForm.reset();
        });
    }
  }

  copyLink() {
    this.clipboard.copy(this.assessmentLink);
    this.toast.success('Link Copied', {
      icon: '👏',
      style: {
        background: '#51A150',
        color: '#fff',
      },
    });
  }

  editAssessment() {
    this.router.navigate(['/dashboard/assessments/edit', this.assessment._id]);
  }
  deleteAssessment(id: string | undefined) {
    // console.log(id);
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      width: '550px',
      height: '150px',
      data: {
        title: 'Delete Assessment',
        message: 'Are you sure you want to delete this assessment?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        // console.log('Yes clicked');
        this.assessmentService
          .deleteAssessment(id as string)
          .subscribe((_res) => {
            // console.log(res);
            // this.deleteAssessmentEvent.emit(id);
            this.router.navigate(['/dashboard/assessments']);
          });
      }
    });
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
