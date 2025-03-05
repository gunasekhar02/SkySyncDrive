import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  // Check if the user is authenticated (e.g., has a valid token)
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); 
    return !!token; // Return true if the token exists
  }


  // Log out the user and redirect to the login page
  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }


  // Check if a token exists in localStorage
  public hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Update login state
  setLoginState(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }
}
