import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Candidate } from 'src/app/interfaces/candidate';

@Component({
  selector: 'app-candidate-table',
  templateUrl: './candidate-table.component.html',
  styles: [],
})
export class CandidateTableComponent {
  @Input() candidates: Candidate[] = [];
  @Output() deleteCandidateEmitter = new EventEmitter<string>();
  constructor() {}

  deleteCandidate(candidateId: string | undefined) {
    this.deleteCandidateEmitter.emit(candidateId);
  }

  clickUp() {
    this.candidates.sort((a, b) => {
      return b.score - a.score;
    });
  }
  clickDown() {
    this.candidates.sort((a, b) => {
      return a.score - b.score;
    });
  }
}
