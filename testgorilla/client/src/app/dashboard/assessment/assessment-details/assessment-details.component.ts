import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Assessment } from 'src/app/interfaces/assessment';
import { AssessmentService } from 'src/app/services/assessment.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-assessment-details',
  templateUrl: './assessment-details.component.html',
  styles: [],
})
export class AssessmentDetailsComponent implements OnInit {
  assessmentLink: string = 'http://localhost:4200/assessment/';
  assessment!: Assessment;
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
  ) {}

  ngOnInit(): void {
    const assessmentId = this.activatedRoute.snapshot.params['id'];
    this.assessmentLink += assessmentId;
    this.assessmentService
      .getAssessmentById(assessmentId)
      .subscribe((response) => {
        // console.log(response);
        this.assessment = response;
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
    // this.router.navigate(['/dashboard/assessment/edit', this.assessment.id]);
  }
}
