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
  maxSize = 5;
  bigTotalItems = 175;
  bigCurrentPage = 1;
  selectedOption = 'All Launches';
  allLaunches: Launch[];
  title = 'spaceX';
  launchFilters = [
    'All Launches',
    'Upcoming Launches',
    'Successful Launches',
    'Failed Launches',
  ];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getAllLaunches().subscribe((data) => {
      if (data) {
        this.allLaunches = data['docs'];
        console.log(this.allLaunches)
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
}
