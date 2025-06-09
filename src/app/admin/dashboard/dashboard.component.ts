import { Component, OnInit } from "@angular/core";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import {SessionStorageService} from "../../shared/services/session-storage.service";
import {User} from "../../shared/interfaces/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  bubbleChart!: Chart;
  barChart!: Chart;
  lineChart!: Chart; // Declare the line chart
  user: User | null = null;


  constructor(
    private sessionStorageService : SessionStorageService,
    private router: Router,
  ) {
  }
  ngOnInit(): void {


    this.user = this.sessionStorageService.getCurrentUser();
    if (this.user) {
      this.router.navigateByUrl('admin/dashboard');
    } else {
      // If the user is not authenticated, redirect to the sign-up page
      this.router.navigateByUrl('auth/login');
    }

    Chart.register(...registerables);

    // Bubble Chart configuration (as in your original code)
    const DATA_COUNT = 7;
    const NUMBER_CFG = { count: DATA_COUNT, rmin: 5, rmax: 15, min: 0, max: 100 };
    const generateBubbles = (config: any) =>
      Array.from({ length: config.count }, () => ({
        x: Math.floor(Math.random() * (config.max - config.min + 1)) + config.min,
        y: Math.floor(Math.random() * (config.max - config.min + 1)) + config.min,
        r: Math.floor(Math.random() * (config.rmax - config.rmin + 1)) + config.rmin,
      }));

    const bubbleData = {
      datasets: [
        {
          label: 'Bubble Dataset 1',
          data: generateBubbles(NUMBER_CFG),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Bubble Dataset 2',
          data: generateBubbles(NUMBER_CFG),
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
        },
      ],
    };

    const bubbleConfig: ChartConfiguration<'bubble'> = {
      type: 'bubble',
      data: bubbleData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bubble Chart',
          },
        },
      },
    };

    this.bubbleChart = new Chart('bubbleChart', bubbleConfig);

    // Bar Chart configuration (as in your original code)
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const barData = {
      labels: labels,
      datasets: [
        {
          label: 'Fully Rounded',
          data: Array.from({ length: 7 }, () => Math.random() * 200 - 100),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderWidth: 2,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
        },
        {
          label: 'Small Radius',
          data: Array.from({ length: 7 }, () => Math.random() * 200 - 100),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    };

    const barConfig: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: barData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      },
    };

    this.barChart = new Chart('barChart', barConfig);

    // Line Chart configuration (with easing animation)
    const lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Progressive Line with Easing',
        data: Array.from({ length: 7 }, () => Math.random() * 100),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.1,
        pointRadius: 0, // Use pointRadius instead of radius
      }]
    };

    const lineConfig: ChartConfiguration<'line'> = {
      type: 'line',
      data: lineData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Progressive Line with Easing',
          },
        },
        animation: {
          duration: 2000, // Set the animation duration
          easing: 'easeInOutQuad', // Apply easing function
        },
      },
    };

    this.lineChart = new Chart('lineChart', lineConfig); // Initialize the line chart
  }
}
