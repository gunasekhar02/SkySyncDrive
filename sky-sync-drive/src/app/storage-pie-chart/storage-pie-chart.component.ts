import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartType } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
// Import necessary Chart.js components
import {
  Chart,
  DoughnutController,
  ArcElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { ApiserviceService } from '../../apiservice.service';

// Register the necessary chart elements and plugins
Chart.register(DoughnutController, ArcElement, Legend, Tooltip);

@Component({
  selector: 'app-storage-pie-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatCardModule], // Import NgChartsModule and CommonModule
  templateUrl: './storage-pie-chart.component.html',
  styleUrl: './storage-pie-chart.component.css',
})
export class StoragePieChartComponent {
  private totalStorageMB = 50; // Total storage in MB

  public pieChartData: any = { labels: [], datasets: [] };
  public pieChartOptions: ChartOptions = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Allow the chart to resize freely
    plugins: {
      legend: {
        display: true, // Ensure the legend is displayed
        position: 'right', // Position of the legend
      },
      tooltip: {
        enabled: true, // Ensure tooltips are enabled
      },
    },
  };
  // Pie chart type
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private apiService: ApiserviceService) {}

  ngOnInit() {
    this.fetchStorageData();
  }

  fetchStorageData() {
    this.apiService.getAllMediaOfUser().subscribe((data) => {
      console.log('API Response:', data); // Debugging: Check the structure of data
      if (Array.isArray(data)) {
        const occupiedStorageKB = data.reduce(
          (sum, file) => {
            const fileSizeKB = this.convertToKB(file.fileSize);
            return sum + (isNaN(fileSizeKB) ? 0 : fileSizeKB); // Handle invalid file sizes
          },
          0
        );
        const occupiedStorageMB = occupiedStorageKB / 1024; // Convert to MB
        const freeStorageMB = this.totalStorageMB - occupiedStorageMB;
  
        this.pieChartData = {
          labels: ['Used Storage (MB)', 'Free Storage (MB)'],
          datasets: [
            {
              data: [occupiedStorageMB, freeStorageMB],
              backgroundColor: ['#ff8989', '#89ff89'],
              hoverBackgroundColor: ['#ff8989', '#89ff89'],
            },
          ],
        };
      } else {
        console.error('Expected an array but got:', data);
      }
    });
  }

  convertToKB(fileSize: string | number): number {
    if (typeof fileSize === 'string') {
      const size = parseFloat(fileSize);
      if (fileSize.toUpperCase().includes('MB')) {
        return size * 1024; // Convert MB to KB
      } else if (fileSize.toUpperCase().includes('KB')) {
        return size; // Already in KB
      } else if (fileSize.toUpperCase().includes('GB')) {
        return size * 1024 * 1024; // Convert GB to KB
      }
    } else if (typeof fileSize === 'number') {
      // If fileSize is already a number, assume it's in bytes
      return fileSize / 1024; // Convert bytes to KB
    }
    return 0; // Default to 0 if the format is invalid
  }
}
