import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  // Check if a token exists in localStorage
  public hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Update login state
  setLoginState(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }

}
