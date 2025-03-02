import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../apiservice.service';
import { Subscription } from 'rxjs'; // Import Subscription for cleanup
import { response } from 'express';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})


export class SignupComponent {

  signUpForm: FormGroup;
  loading: boolean = false;
  private loginSubscription: Subscription | null = null; // Store API call subscription

   constructor(
      private fb: FormBuilder,
      private apiService: ApiserviceService,
      private router: Router
    ) {
      // Initialize the form
      this.signUpForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        firstName:['',[Validators.required]],
        lastName:['',[Validators.required]],
      });
    }

      // Getter for easy access to form controls with correct typing
  get email(): FormControl {
    return this.signUpForm.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.signUpForm.get('password') as FormControl;
  }
  get firstName(): FormControl {
    return this.signUpForm.get('firstName') as FormControl;
  }
  get lastName(): FormControl {
    return this.signUpForm.get('lastName') as FormControl;
  }


  onSignUp() {
    if (this.signUpForm.invalid) {
      return; // Stop if the form is invalid
    }

    this.loading = true; // Show "Logging in..."

    const userSignUp = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      firstName:this.signUpForm.value.firstName,
      lastName:this.signUpForm.value.lastName,
    };

    // Call the login API using pipe
    this.loginSubscription = this.apiService.userSignIn(userSignUp).subscribe(
      (response: any) => {
        console.log('sign up successful', response);
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/login']);
          alert('Successfully signed up please login.');
        }, 1500);

      },
      (error) => {
        console.error('sign up failed', error);
        alert('sign up failed. Please try again.');
        this.loading = false;
      }
    );
  }

  // getErrorMessage() {
  //   if (this.email?.hasError('required')) {
  //     return 'Email is required';
  //   }
  //   if (this.email?.hasError('email')) {
  //     return 'Invalid email format';
  //   }
  //   if (this.password?.hasError('required')) {
  //     return 'Password is required';
  //   }
  //   if (this.password?.hasError('minlength')) {
  //     return 'Password must be at least 6 characters long';
  //   }
  //   if (this.firstName?.hasError('required')) {
  //     return 'First Name is required';
  //   }
  //   if (this.lastName?.hasError('required')) {
  //     return 'Last Name is required';
  //   }
  //   return '';
  // }

}
