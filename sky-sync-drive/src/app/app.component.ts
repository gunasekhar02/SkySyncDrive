import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthServiceService } from '../auth-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,MatToolbarModule,MatButtonModule,MatDialogModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private authService:AuthServiceService, private router:Router){

  }
  hideLogOut:boolean=true;
  title = 'sky-sync-drive';
  ngOnInit(){
    // Subscribe to the login state
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.hideLogOut = !isLoggedIn; // Update hideLogOut based on login state
    });

    // Initialize the login state
    this.authService.setLoginState(this.authService.hasToken());
  }

  onLogout(){
    localStorage.removeItem('token'); // Remove the token
    this.authService.setLoginState(false); // Update login state
    this.router.navigate(['/login']); // Redirect to login page
  }
}
