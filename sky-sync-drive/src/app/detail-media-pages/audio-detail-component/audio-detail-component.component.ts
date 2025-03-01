import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit,ViewChild,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';

interface MediaFile {
  id: number;
  fileName: string;
  fileType: string;
  filePath: string;
}


@Component({
  selector: 'app-audio-detail-component',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule,MatDialogModule],
  templateUrl: './audio-detail-component.component.html',
  styleUrls: ['./audio-detail-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AudioDetailComponentComponent implements OnInit {
  dummyFiles: MediaFile[] = [];

  ngOnInit(): void {
    this.loadDummyData();
  }
    readonly dialog = inject(MatDialog);
  

  loadDummyData() {
    this.dummyFiles = [
      { id: 1, fileName: 'sample1.mp3', fileType: 'audio/mpeg', filePath: 'assets/audios/sample1.mp3' },
      { id: 2, fileName: 'sample2.mp3', fileType: 'audio/mpeg', filePath: 'assets/audios/sample2.mp3' },
      { id: 3, fileName: 'sample-audio.mp3', fileType: 'audio/mpeg', filePath: 'assets/audios/sample-audio.mp3' },
    ];
  }

  playAudio(audioPath: string) {
    const audio = new Audio(audioPath);
    audio.play();
  }
  openAudioDialog(file: any): void {
    const dialogRef = this.dialog.open(DetailAudioDialog, {
      data: { file }, // Pass the file object to the dialog
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'audio-popup-dialog.html',
  imports: [MatDialogModule],
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailAudioDialog {
  
  selectedAudiolink:string="";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { file: any } // Inject the file data
  ) {
    this.selectedAudiolink=data.file.filePath;
  }



}