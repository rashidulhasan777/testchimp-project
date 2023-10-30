import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}
  getQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`${this.baseUrl}/api/question`, {
      withCredentials: true,
    });
  }
  getQuestionById(id: string): Observable<Question> {
    return this.httpClient.get<Question>(`${this.baseUrl}/api/question/${id}`, {
      withCredentials: true,
    });
  }
  getQuestionByCategory(
    categoryIds: (string | undefined)[],
  ): Observable<string[]> {
    return this.httpClient.post<string[]>(
      `${this.baseUrl}/api/question/category`,
      { categoryIds },
      { withCredentials: true },
    );
  }
  createQuestion(question: Question) {
    return this.httpClient.post(`${this.baseUrl}/api/question`, question, {
      withCredentials: true,
    });
  }
  updateQuestionById(id: string, question: Question) {
    return this.httpClient.put(`${this.baseUrl}/api/question/${id}`, question, {
      withCredentials: true,
    });
  }
  deleteQuestionById(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/api/question/${id}`, {
      withCredentials: true,
    });
  }
}
