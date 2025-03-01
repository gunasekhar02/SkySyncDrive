import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartType } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
// Import necessary Chart.js components
import { Chart, PieController, ArcElement, Legend, Tooltip } from 'chart.js';

// Register the necessary chart elements and plugins
Chart.register(PieController, ArcElement, Legend, Tooltip);

@Component({
  selector: 'app-storage-pie-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule,MatCardModule], // Import NgChartsModule and CommonModule
  templateUrl: './storage-pie-chart.component.html',
  styleUrl: './storage-pie-chart.component.css',
})
export class StoragePieChartComponent {
  // Pie chart data
  public pieChartData = {
    labels: ['Used Storage in GB', 'Free Storage in GB'], // Labels for the chart
    datasets: [
      {
        data: [30, 70], // Example data: 70% used, 30% free
        backgroundColor: ['#ff8989', '#89ff89'], // Colors for the chart
        hoverBackgroundColor: ['#ff8989', '#89ff89'], // Hover colors
      },
    ],
  };

  // Pie chart options
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
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
}