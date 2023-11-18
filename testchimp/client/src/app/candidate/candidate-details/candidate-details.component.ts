import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Candidate } from 'src/app/interfaces/candidate';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styles: [],
})
export class CandidateDetailsComponent implements OnInit {
  candidate!: Candidate;
  currentImageIndex = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private candidateService: CandidateService,
    private toast: HotToastService,
    private clipboard: Clipboard,
  ) {}

  ngOnInit(): void {
    const candidateId = this.activatedRoute.snapshot.params['id'];
    this.candidateService
      .getCandidateById(candidateId)
      .subscribe((candidate) => {
        this.candidate = candidate;
        if (candidate.images.length === 0) {
          this.currentImageIndex = -1;
        }
        // console.log(this.candidate);
      });
  }
  changeImage(next: boolean) {
    // console.log(next);

    if (next) {
      if (this.currentImageIndex === this.candidate.images.length - 1) {
        this.currentImageIndex = 0;
      } else {
        this.currentImageIndex++;
      }
    } else {
      if (this.currentImageIndex === 0) {
        this.currentImageIndex = this.candidate.images.length - 1;
      } else {
        this.currentImageIndex--;
      }
    }
  }
  copyEmail() {
    this.clipboard.copy(this.candidate.email);
    this.toast.success('Email Copied', {
      icon: '👏',
      style: {
        background: '#51A150',
        color: '#fff',
      },
    });
  }
}
