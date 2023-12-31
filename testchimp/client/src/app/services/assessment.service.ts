import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assessment } from '../interfaces/assessment';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}
  getAssessments(): Observable<Assessment[]> {
    return this.httpClient.get<Assessment[]>(`${this.baseUrl}/api/assessment`, {
      withCredentials: true,
    });
  }
  getAssessmentById(id: string): Observable<Assessment> {
    return this.httpClient.get<Assessment>(
      `${this.baseUrl}/api/assessment/${id}`,
      { withCredentials: true },
    );
  }
  getAssessmentByCreatedBy(id: string): Observable<Assessment[]> {
    return this.httpClient.get<Assessment[]>(
      `${this.baseUrl}/api/assessment/createdby/${id}`,
      { withCredentials: true },
    );
  }
  createAssessment(assessment: Assessment): Observable<Assessment> {
    return this.httpClient.post<Assessment>(
      `${this.baseUrl}/api/assessment`,
      assessment,
      { withCredentials: true },
    );
  }
  updateAssessment(id: string, assessment: Assessment): Observable<Assessment> {
    return this.httpClient.put<Assessment>(
      `${this.baseUrl}/api/assessment/${id}`,
      assessment,
      { withCredentials: true },
    );
  }
  deleteAssessment(id: string): Observable<Assessment> {
    return this.httpClient.delete<Assessment>(
      `${this.baseUrl}/api/assessment/${id}`,
      { withCredentials: true },
    );
  }
}
