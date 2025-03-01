import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { GreetComponent } from '../pages/greet/greet.component';
import { AboutComponent } from '../pages/about/about.component';
import { StoragePieChartComponent } from './storage-pie-chart/storage-pie-chart.component';

export const routes: Routes = [
    {
        path: "", redirectTo: "welcome", pathMatch: "full"
    },
    {
        path: "welcome", component: GreetComponent
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "home", component: HomeComponent
    },
    {
        path: "signup", component: SignupComponent
    },
    {
        path: "about", component: AboutComponent
    },
    {
        path:"sd",component:StoragePieChartComponent
    }
];
