import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createUser(signupForm: FormGroup): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.baseUrl}/users/signup`,
      signupForm,
      { withCredentials: true },
    );
  }
  loginUser(loginForm: FormGroup): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.baseUrl}/users/login`,
      loginForm,
      { withCredentials: true },
    );
  }
  getUser(): Observable<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    exp: number;
  }> {
    return this.http.get<{
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      exp: number;
    }>(`${this.baseUrl}/users`, { withCredentials: true });
  }
}
