import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin,UserSignin } from './app/Models/user.models';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private apiAuthUrl = 'https://localhost:7103/api/Auth'; 
  constructor(private httpClient:HttpClient) {
  }

  userSignIn(userSignIn:UserSignin){
    return this.httpClient.post(`${this.apiAuthUrl}/signup`, userSignIn);
  }

  userLogin(userLogin:UserLogin){
    return this.httpClient.post(`${this.apiAuthUrl}/login`, userLogin);
  }
}
