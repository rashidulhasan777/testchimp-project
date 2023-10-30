import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  sendEmail(email: string, subject: string, message: string) {
    return this.httpClient.post(
      `${this.baseUrl}/api/mailer/send`,
      { email, subject, message },
      { withCredentials: true },
    );
  }
}
