import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
interface MediaFile {
  id: number;
  fileName: string;
  fileType: string;
  filePath: string;
}

@Component({
  selector: 'app-images-detail-component',
  standalone: true,
  imports: [MatDialogModule,CommonModule,MatCardModule],
  templateUrl: './images-detail-component.component.html',
  styleUrl: './images-detail-component.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesDetailComponentComponent {
  dummyFiles: MediaFile[] = [];
  ngOnInit(): void {
    this.loadDummyData();
  }

  readonly dialog = inject(MatDialog);

  openImageDialog() {
    const dialogRef = this.dialog.open(DetailImageDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  loadDummyData() {
    this. dummyFiles= [
      { id: 1, fileName: 'nature.jpg', fileType: 'image/jpeg', filePath: 'assets/images/nature.jpg' },
      { id: 2, fileName: 'sunset.png', fileType: 'image/png', filePath: 'assets/images/images-cover.png' },
      { id: 3, fileName: 'song.mp3', fileType: 'audio/mpeg', filePath: 'assets/audio/song.mp3' },
      { id: 4, fileName: 'tune.wav', fileType: 'audio/wav', filePath: 'assets/audio/tune.wav' },
      { id: 5, fileName: 'movie.mp4', fileType: 'video/mp4', filePath: 'assets/videos/movie.mp4' },
      { id: 6, fileName: 'clip.avi', fileType: 'video/avi', filePath: 'assets/videos/clip.avi' },
    ];
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'image-popup-dialog.html',
  imports: [MatDialogModule],
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailImageDialog {}
