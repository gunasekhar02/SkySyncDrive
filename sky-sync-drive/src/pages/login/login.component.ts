import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../apiservice.service';
import { Subscription } from 'rxjs'; // Import Subscription for cleanup

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  private loginSubscription: Subscription | null = null; // Store API call subscription
  hide: boolean = true;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private router: Router
  ) {
    // Initialize the form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter for easy access to form controls with correct typing
  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return; // Stop if the form is invalid
    }

    this.loading = true; // Show "Logging in..."

    const userLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    // Call the login API using pipe
    this.loginSubscription = this.apiService.userLogin(userLogin).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        // Store the token in local storage
        localStorage.setItem('token', response.token);
        // Ensure loader is visible for at least 1.5 seconds before redirecting
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/home']);
        }, 1500);
      },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials.');
        this.loading = false;
      }
    );
  }

  getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }
    if (this.email?.hasError('email')) {
      return 'Invalid email format';
    }
    if (this.password?.hasError('required')) {
      return 'Password is required';
    }
    if (this.password?.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }

  // Clean up resources when navigating away
  ngOnDestroy() {
    console.log('Login component destroyed, resetting form...');

    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe(); // Unsubscribe API call if still ongoing
    }

    this.loginForm.reset(); // Reset email and password
    this.loading = false; // Reset loading state
  }
}
