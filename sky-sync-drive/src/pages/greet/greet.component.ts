import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-greet',
  standalone: true,
  imports: [RouterModule,MatToolbarModule,MatButtonModule,MatIconModule],
  templateUrl: './greet.component.html',
  styleUrl: './greet.component.css'
})
export class GreetComponent {



}
