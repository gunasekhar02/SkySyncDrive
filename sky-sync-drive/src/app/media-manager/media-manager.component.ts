import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface MediaFile {
  id: number;
  fileName: string;
  fileType: string;
  filePath: string;
}


@Component({
  selector: 'app-media-manager',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './media-manager.component.html',
  styleUrl: './media-manager.component.css'
})
export class MediaManagerComponent {
  images: MediaFile[] = [];
  audio: MediaFile[] = [];
  videos: MediaFile[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
   // this.fetchMediaFiles();
   this.loadDummyData();

  }

  loadDummyData() {
    const dummyFiles: MediaFile[] = [
      { id: 1, fileName: 'nature.jpg', fileType: 'image/jpeg', filePath: 'assets/images/nature.jpg' },
      { id: 2, fileName: 'sunset.png', fileType: 'image/png', filePath: 'assets/images/sunset.png' },
      { id: 3, fileName: 'song.mp3', fileType: 'audio/mpeg', filePath: 'assets/audio/song.mp3' },
      { id: 4, fileName: 'tune.wav', fileType: 'audio/wav', filePath: 'assets/audio/tune.wav' },
      { id: 5, fileName: 'movie.mp4', fileType: 'video/mp4', filePath: 'assets/videos/movie.mp4' },
      { id: 6, fileName: 'clip.avi', fileType: 'video/avi', filePath: 'assets/videos/clip.avi' },
    ];

    this.categorizeFiles(dummyFiles);
  }

  fetchMediaFiles() {
    this.http.get<MediaFile[]>('https://localhost:5001/api/media').subscribe(
      (response) => {
        this.categorizeFiles(response);
      },
      (error) => {
        console.error('Error fetching media files', error);
      }
    );
  }

  categorizeFiles(files: MediaFile[]) {
    this.images = files.filter((file) => file.fileType.startsWith('image'));
    this.audio = files.filter((file) => file.fileType.startsWith('audio'));
    this.videos = files.filter((file) => file.fileType.startsWith('video'));
  }
}
