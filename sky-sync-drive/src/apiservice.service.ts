import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { UserLogin, UserSignin } from './app/Models/user.models';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  private apiAuthUrl = 'https://localhost:7103/api/Auth';
  private fileManagerUrl = 'https://localhost:7177/api/files';
  constructor(private httpClient: HttpClient) {}

  // Method to get the token (e.g., from localStorage)
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Method to create headers with the token
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  userSignIn(userSignIn: UserSignin) {
    return this.httpClient.post(`${this.apiAuthUrl}/signup`, userSignIn);
  }

  userLogin(userLogin: UserLogin) {
    return this.httpClient.post(`${this.apiAuthUrl}/login`, userLogin);
  }

  getAllMediaOfUser() {
    const headers = this.getHeaders(); // Get headers with the token
    return this.httpClient.get(`${this.fileManagerUrl}`, { headers })  }
}
