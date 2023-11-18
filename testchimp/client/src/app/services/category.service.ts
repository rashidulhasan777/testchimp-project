import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { Question } from '../interfaces/question';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}
  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/api/category`, {
      withCredentials: true,
    });
  }
  getCategoryById(id: string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseUrl}/api/category/${id}`, {
      withCredentials: true,
    });
  }
  getQuestionsByCategoryId(id: string): Observable<Question[]> {
    return this.httpClient.get<Question[]>(
      `${this.baseUrl}/api/category/${id}/questions`,
      {
        withCredentials: true,
      },
    );
  }
  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(
      `${this.baseUrl}/api/category`,
      category,
      {
        withCredentials: true,
      },
    );
  }
  updateCategory(id: string, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(
      `${this.baseUrl}/api/category/${id}`,
      category,
      {
        withCredentials: true,
      },
    );
  }
  deleteCategory(id: string): Observable<Category> {
    return this.httpClient.delete<Category>(
      `${this.baseUrl}/api/category/${id}`,
      {
        withCredentials: true,
      },
    );
  }
}
