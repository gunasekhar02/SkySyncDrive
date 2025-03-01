import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit,ViewChild,inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



interface MediaFile {
  id: number;
  fileName: string;
  fileType: string;
  filePath: string;
}

@Component({
  selector: 'app-video-detail-component',
  templateUrl: './video-detail-component.component.html',
  styleUrls: ['./video-detail-component.component.css'],
  imports: [CommonModule, MatCardModule, MatIconModule,MatDialogModule],
  standalone:true
})
export class VideoDetailComponentComponent implements OnInit {
  dummyFiles: MediaFile[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadDummyData();
  }

  loadDummyData() {
    this.dummyFiles = [
      { id: 1, fileName: 'sample-video.mp4', fileType: 'video/mp4', filePath: 'assets/videos/sample-video.mp4' },
      { id: 2, fileName: 'movie.mp4', fileType: 'video/mp4', filePath: 'assets/videos/movie.mp4' },
    ];
  }

  openVideoDialog(file: any): void {
    const dialogRef = this.dialog.open(DetailVideoDialog, {
          data: { file }, // Pass the file object to the dialog
        });
      
        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        });

  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'video-popup-dialog.html',
  imports: [MatDialogModule],
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailVideoDialog {
  selectedVideolink:string="";
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: { file: any } // Inject the file data
    ) {
      this.selectedVideolink=data.file.filePath;
    }
  
}