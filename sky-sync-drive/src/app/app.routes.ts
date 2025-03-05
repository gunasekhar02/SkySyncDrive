import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { GreetComponent } from '../pages/greet/greet.component';
import { AboutComponent } from '../pages/about/about.component';
import { StoragePieChartComponent } from './storage-pie-chart/storage-pie-chart.component';
import { ImagesDetailComponentComponent } from './detail-media-pages/images-detail-component/images-detail-component.component';
import { AudioDetailComponentComponent } from './detail-media-pages/audio-detail-component/audio-detail-component.component';
import { VideoDetailComponentComponent } from './detail-media-pages/video-detail-component/video-detail-component.component';
import { MediaManagerComponent } from './media-manager/media-manager.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UnauthorizedComponent } from '../pages/unauthorized/unauthorized.component';
import { AuthGuard } from '../auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    component: GreetComponent 
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'home/media/images-detail',
    component: ImagesDetailComponentComponent,canActivate: [AuthGuard] 
  },
  {
    path: 'home/media/audios-detail',
    component: AudioDetailComponentComponent,canActivate: [AuthGuard] 
  },
  {
    path: 'home/media/videos-detail',
    component: VideoDetailComponentComponent,canActivate: [AuthGuard] 
  },
  {
    path: 'home',
    component: HomeComponent, // HomeComponent will act as the parent
    children: [
      { path: 'storage', component: StoragePieChartComponent,canActivate: [AuthGuard]  },
      { path: 'media', component: MediaManagerComponent , canActivate: [AuthGuard] },
      { path: 'upload-media', component: FileUploadComponent , canActivate: [AuthGuard] },
      { path: '', redirectTo: 'storage', pathMatch: 'full'  }, // Default child route
    ]
  },
  { 
    path: 'unauthorized', component: UnauthorizedComponent 
  },
  { 
    path: '**', redirectTo: '/unauthorized' 
  }, // Fallback for invalid routes


];
