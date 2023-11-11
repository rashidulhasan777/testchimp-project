import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  // baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}
  getQuestions(page: number, limit: number): Observable<any> {
    return this.httpClient.get<any>(
      `/api/question/?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      },
    );
  }
  getQuestionById(id: string): Observable<Question> {
    return this.httpClient.get<Question>(`/api/question/${id}`, {
      withCredentials: true,
    });
  }
  getQuestionByCategory(
    categoryIds: (string | undefined)[],
  ): Observable<string[]> {
    return this.httpClient.post<string[]>(
      `/api/question/category`,
      { categoryIds },
      { withCredentials: true },
    );
  }
  createQuestion(question: Question) {
    return this.httpClient.post(`/api/question`, question, {
      withCredentials: true,
    });
  }
  updateQuestionById(id: string, question: Question) {
    return this.httpClient.put(`/api/question/${id}`, question, {
      withCredentials: true,
    });
  }
  deleteQuestionById(id: string) {
    return this.httpClient.delete(`/api/question/${id}`, {
      withCredentials: true,
    });
  }
}
