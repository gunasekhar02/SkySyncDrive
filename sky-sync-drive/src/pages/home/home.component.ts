import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { StoragePieChartComponent } from '../../app/storage-pie-chart/storage-pie-chart.component';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../../app/file-upload/file-upload.component';
import { MediaManagerComponent } from '../../app/media-manager/media-manager.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    MatTabsModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tabs = [
    { label: 'Storage', route: 'storage' },
    { label: 'Media', route: 'media' },
    { label: 'Upload Media', route: 'upload-media' },
  ];
}
