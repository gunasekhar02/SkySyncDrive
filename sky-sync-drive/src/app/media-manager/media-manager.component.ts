import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


interface MediaFile {
  id: number;
  fileName: string;
  fileType: string;
  filePath: string;
}


@Component({
  selector: 'app-media-manager',
  standalone: true,
  imports: [MatCardModule,CommonModule,RouterModule],
  templateUrl: './media-manager.component.html',
  styleUrl: './media-manager.component.css'
})
export class MediaManagerComponent {  images: MediaFile[] = [];
  audio: MediaFile[] = [];
  videos: MediaFile[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
  }
  navigateToFolder(folderType: string) {
    this.router.navigate([`home/media/${folderType}`]);
  }
}
