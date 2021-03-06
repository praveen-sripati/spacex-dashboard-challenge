import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Launch } from './data.model';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  // Table Headers
  tableHeaders = [
    'No:',
    'Launched',
    'Location',
    'Mission',
    'Orbit',
    'Launch Status',
    'Rockets'
  ]

  // Pagination Variables
  totalItems = 0;
  maxSize = 5;
  currentPage = 1;
  launchesPerPage: Launch[];

  // simple-select filter options
  selectedOption = 'All Launches';
  launchFilters = [
    'All Launches',
    'Upcoming Launches',
    'Successful Launches',
    'Failed Launches',
  ];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    if (sessionStorage.getItem("selectedOption")) {
      console.log(sessionStorage.getItem("selectedOption"));
      this.selectedOption = sessionStorage.getItem("selectedOption");
      console.log(this.selectedOption);
    }
    this.dataService.getLaunches(1).subscribe((data) => {
      if (data) {
        this.launchesPerPage = data['docs'];
        this.totalItems = data['totalDocs'];
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSelectedOption(selectedOption) {
    this.selectedOption = selectedOption;
    sessionStorage.setItem("selectedOption", this.selectedOption);
    this.getLaunchesData(selectedOption);
  }

  pageChanged(e: any) {
    if (this.selectedOption === 'All Launches') {
      this.dataService.getLaunches(e.page).subscribe((data) => {
        this.setLaunchFields(data)
      });
    }
    if (this.selectedOption === 'Upcoming Launches') {
      this.dataService.getUpcomingLaunches(e.page).subscribe((data) => {
        this.setLaunchFields(data)
      });
    }
    if (this.selectedOption === 'Successful Launches') {
      this.dataService.getSuccessfulLaunches(e.page).subscribe((data) => {
        this.setLaunchFields(data)
      });
    }
    if (this.selectedOption === 'Failed Launches') {
      this.dataService.getFailedLaunches(e.page).subscribe((data) => {
        this.setLaunchFields(data)
      });
    }
  }

  getLaunchesData(selectedOption) {
    if (selectedOption === 'All Launches') {
      this.dataService.getLaunches(1).subscribe((data) => {
        this.setLaunchFields(data)
      });
    }
    if (selectedOption === 'Upcoming Launches') {
      this.dataService.getUpcomingLaunches(1).subscribe((data) => {
        this.setLaunchFields(data)
      });
    }
    if (selectedOption === 'Successful Launches') {
      this.dataService.getSuccessfulLaunches(1).subscribe((data) => {
        this.setLaunchFields(data)
      });
    }
    if (selectedOption === 'Failed Launches') {
      this.dataService.getFailedLaunches(1).subscribe((data) => {
      this.setLaunchFields(data);
      });
    }
  }

  setLaunchFields(data) {
    if (data) {
      this.launchesPerPage = data['docs'];
      this.totalItems = data['totalDocs'];
    }
  }
}
