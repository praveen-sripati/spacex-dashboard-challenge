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
  tableHeaders = [
    'No:',
    'Launched',
    'Location',
    'Mission',
    'Orbit',
    'Launch Status',
    'Rockets'
  ]
  destroy$: Subject<boolean> = new Subject<boolean>();
  totalItems = 0;
  maxSize = 5;
  currentPage = 1;
  selectedOption = 'All Launches';
  launchesPerPage: Launch[];
  title = 'spaceX';
  launchFilters = [
    'All Launches',
    'Upcoming Launches',
    'Successful Launches',
    'Failed Launches',
  ];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getLaunches(1).subscribe((data) => {
      if (data) {
        this.launchesPerPage = data['docs'];
        this.totalItems = data['totalDocs'];
        console.log(data)
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSelectedOption(selectedOption) {
    this.selectedOption = selectedOption;
  }

  pageChanged(e: any) {
    this.dataService.getLaunches(e.page).subscribe((data) => {
      if (data) {
        this.launchesPerPage = data['docs'];
        console.log(data)
      }
    });
  }
}
