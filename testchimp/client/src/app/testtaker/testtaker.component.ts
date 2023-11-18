import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TestResult } from '../interfaces/candidate';
import { Question } from '../interfaces/question';
import { AssessmentService } from '../services/assessment.service';
import { CandidateService } from '../services/candidate.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-testtaker',
  templateUrl: './testtaker.component.html',
  styleUrls: ['./testtaker.component.css'],
})
export class TesttakerComponent implements OnInit {
  name!: string;
  email!: string;
  images: string[] = [];
  browser!: string;
  device!: string;
  location!: string;
  ipAddress!: string;
  assignedBy!: string;
  assessment!: string;
  mouseLeft = false;
  submittedTestResults: TestResult[] = [];

  testTakerIdentityForm!: FormGroup;
  identityFormSubmitted = false;
  setupInfoSubmitted = false;
  isLinear = true;
  questions: Question[] = [];
  totalDuration: number = 0;
  totalDurationUnchanged: number = 0;
  timeLeftPercentage: number = 0;
  minutes!: number;
  seconds!: number;
  showWebcam = false;
  turnOffWebcam = false;
  testCompleted = false;

  elem: any;
  fullScreenModeOn = false;
  deadlineOver = false;

  @HostListener('mouseleave', ['$event']) onLeave(_e: MouseEvent) {
    // console.log('mouse leave');
    // console.log(e);
    if (this.fullScreenModeOn) {
      this.mouseLeft = true;
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: any,
    private activatedRoute: ActivatedRoute,
    private assessmentService: AssessmentService,
    private deviceService: DeviceDetectorService,
    private httpClient: HttpClient,
    private candidateService: CandidateService,
  ) {
    this.testTakerIdentityForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
    });
  }
  cameraInit() {
    this.showWebcam = true;
  }

  ngOnInit(): void {
    this.elem = document.documentElement;
    const deviceInfo = this.deviceService.getDeviceInfo();
    // console.log(deviceInfo);

    this.browser = deviceInfo.browser + ' ' + deviceInfo.browser_version;
    this.device =
      deviceInfo.device +
      ' ' +
      deviceInfo.deviceType +
      ' ' +
      deviceInfo.os_version;
    // console.log(this.browser, this.device);
    this.httpClient
      .get('https://ipinfo.io/?token=935dc87358d154')
      .subscribe((data: any) => {
        this.location = data.city + ', ' + data.country;
        this.ipAddress = data.ip;
        // console.log(this.location, this.ipAddress);
      });
    this.assessment = this.activatedRoute.snapshot.params['id'];
    this.assessmentService
      .getAssessmentById(this.assessment)
      .subscribe((data) => {
        // console.log(data);
        const deadline = new Date(data.deadline as string);
        deadline.setDate(deadline.getDate() + 1);
        // console.log(deadline, new Date());
        if (deadline < new Date()) {
          this.deadlineOver = true;
        }

        this.questions = data.questions as Question[];
        this.questions = this.shuffle(this.questions);
        this.assignedBy = data.createdBy as string;
        this.questions.forEach((question) => {
          this.totalDuration += question.duration;
        });
        this.totalDuration = this.totalDuration * 60;
        this.totalDurationUnchanged = this.totalDuration;
      });
  }

  openFullscreen() {
    this.fullScreenModeOn = true;
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  closeFullscreen() {
    this.fullScreenModeOn = false;
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  saveIdentity() {
    if (this.testTakerIdentityForm.valid) {
      this.identityFormSubmitted = true;
      this.name =
        this.testTakerIdentityForm.value.firstName +
        ' ' +
        this.testTakerIdentityForm.value.lastName;
      this.email = this.testTakerIdentityForm.value.email;
    }
  }
  setupDone(done: boolean) {
    if (done) {
      this.setupInfoSubmitted = true;
      const interval = setInterval(() => {
        this.minutes = Math.floor(this.totalDuration / 60);
        this.seconds = this.totalDuration - this.minutes * 60;
        this.timeLeftPercentage =
          100 - (this.totalDuration / this.totalDurationUnchanged) * 100;

        this.totalDuration--;
        if (this.totalDuration < 0) {
          clearInterval(interval);
          this.turnOffWebcam = true;
          this.submitTest();
          this.minutes = 0;
          this.seconds = 0;
        }
      }, 1000);
      this.openFullscreen();
    }
  }

  receiveImage(image: string) {
    this.images.push(image);
    console.log(this.images);
  }

  submittedAnswer(submittedAnswerObj: TestResult) {
    for (let i = 0; i < this.submittedTestResults.length; i++) {
      if (
        this.submittedTestResults[i].question === submittedAnswerObj.question
      ) {
        this.submittedTestResults.splice(i, 1);
        break;
      }
    }
    this.submittedTestResults.push(submittedAnswerObj);
    console.log(this.submittedTestResults);
  }

  submitTest() {
    const totalQuestions = this.questions.length;
    let correctAnswers = 0;
    for (let i = 0; i < this.submittedTestResults.length; i++) {
      if (
        this.submittedTestResults[i].correctAnswer ===
        this.submittedTestResults[i].givenAnswer
      ) {
        correctAnswers++;
      }
    }
    const score = Number(((correctAnswers / totalQuestions) * 100).toFixed(2));
    this.candidateService
      .createCandidate({
        name: this.name,
        email: this.email,
        images: this.images,
        browser: this.browser,
        device: this.device,
        location: this.location,
        ipAddress: this.ipAddress,
        assignedBy: this.assignedBy,
        assessment: this.assessment,
        submittedTestResults: this.submittedTestResults,
        score: score,
        mouseLeft: this.mouseLeft,
      })
      .subscribe((data) => {
        console.log(data);
        this.testCompleted = true;
        this.setupInfoSubmitted = false;
        this.identityFormSubmitted = false;
        this.closeFullscreen();
      });
  }

  backClicked() {
    this.identityFormSubmitted = false;
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
