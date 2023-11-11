import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidate } from '../interfaces/candidate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  // baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}
  createCandidate(candidate: Candidate) {
    return this.httpClient.post<Candidate>(
      `/api/candidate`,
      candidate,
      { withCredentials: true },
    );
  }
  createCandidateForTesttaker(candidate: Candidate) {
    return this.httpClient.post<Candidate>(
      `/api/testtaker/candidate`,
      candidate,
    );
  }
  getCandidates(): Observable<Candidate[]> {
    return this.httpClient.get<Candidate[]>(`/api/candidate`, {
      withCredentials: true,
    });
  }
  getCandidateById(candidateId: string): Observable<Candidate> {
    return this.httpClient.get<Candidate>(
      `/api/candidate/${candidateId}`,
      { withCredentials: true },
    );
  }
  getCandidateByAssessment(assessmentId: string): Observable<Candidate[]> {
    return this.httpClient.get<Candidate[]>(
      `/api/candidate/assessment/${assessmentId}`,
      { withCredentials: true },
    );
  }
  getCandidateByAssignedBy(assignedById: string): Observable<Candidate[]> {
    return this.httpClient.get<Candidate[]>(
      `/api/candidate/assignedby/${assignedById}`,
      { withCredentials: true },
    );
  }
  deleteCandidateById(candidateId: string) {
    return this.httpClient.delete<Candidate>(
      `/api/candidate/${candidateId}`,
      { withCredentials: true },
    );
  }
}
