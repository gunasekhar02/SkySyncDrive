import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for Angular directives like *ngFor
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
  providers: [HttpClient]
})
export class FileUploadComponent {
  files: File[] = [];

  constructor(private http: HttpClient) {}

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.files = Array.from(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files = Array.from(input.files);
    }
  }

  uploadFiles() {
    if (this.files.length === 0) return;

    const formData = new FormData();
    this.files.forEach((file) => formData.append('files', file));

    this.http.post('https://localhost:5001/api/upload', formData).subscribe(
      (response:any) => {
        console.log('Files uploaded successfully', response);
        this.files = []; // Clear the file list
      },
      (error:any) => {
        console.error('Error uploading files', error);
      }
    );
  }
}
