import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

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
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users`, {
      withCredentials: true,
    });
  }
  getUserRole(): string | undefined {
    const jwtToken = this.cookieService.get('jwtToken');
    const payload: User = jwtDecode(jwtToken as string);
    return payload.role;
  }
  getUserID(): string | undefined {
    const jwtToken = this.cookieService.get('jwtToken');
    const payload: User = jwtDecode(jwtToken as string);
    return payload.id;
  }
}
