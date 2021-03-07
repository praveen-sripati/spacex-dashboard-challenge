import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
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

  // Daterange Picker variables
  @ViewChild(DaterangepickerDirective, { static: false })
  pickerDirective: DaterangepickerDirective;
  inputSizes: {};
  selected: any;
  alwaysShowCalendars: boolean;
  localeConfig = {
    format: 'MM/DD/YYYY', // could be 'YYYY-MM-DDTHH:mm:ss.SSSSZ'
    displayFormat: 'DD MMM y', // default is format value
    direction: 'ltr', // could be rtl
    separator: ' To ', // default is ' - '
    cancelLabel: 'Cancel', // detault is 'Cancel'
    customRangeLabel: 'Custom range',
  };
  ranges: any = {
    // 'Today': [moment(), moment()],
    // 'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    // 'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    // 'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    // 'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Past week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
    'Past month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Past 3 months': [moment().subtract(3, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Past 6 months': [moment().subtract(6, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Past year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'month').endOf('month')],
    'Past 2 years': [moment().subtract(2, 'year').startOf('year'), moment().subtract(1, 'month').endOf('month')],
  }
  dateLimit: number = 30;
  startDate: Date;
  endDate: Date;

  // Table Headers
  tableHeaders = [
    'No:',
    'Launched',
    'Location',
    'Mission',
    'Orbit',
    'Launch Status',
    'Rockets',
  ];

  // Pagination Variables
  totalLaunches = 0;
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

  constructor(private dataService: DataService) {
    this.alwaysShowCalendars = true;
  }

  ngOnInit() {
    if (sessionStorage.getItem('selectedOption')) {
      this.selectedOption = sessionStorage.getItem('selectedOption');
    }
    this.getLaunchesData(this.selectedOption);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSelectedOption(selectedOption) {
    this.selectedOption = selectedOption;
    sessionStorage.setItem('selectedOption', this.selectedOption);
    this.getLaunchesData(selectedOption);
  }

  pageChanged(e: any) {
    if (this.selectedOption === 'All Launches') {
        if(this.startDate && this.endDate) {
          this.dataService.getLaunches(e.page, this.startDate, this.endDate).subscribe(data => {
            this.setLaunchFields(data);
          });
        } else {
          this.dataService.getLaunches(e.page).subscribe(data => {
            this.setLaunchFields(data);
          });
        }
    }
    if (this.selectedOption === 'Upcoming Launches') {
      if (this.startDate && this.endDate) {
        this.dataService.getUpcomingLaunches(e.page, this.startDate, this.endDate).subscribe(data => {
          this.setLaunchFields(data);
        });
      } else {
        this.dataService.getUpcomingLaunches(e.page).subscribe(data => {
          this.setLaunchFields(data);
        });
      }
    }
    if (this.selectedOption === 'Successful Launches') {
      if (this.startDate && this.endDate) {
        this.dataService.getSuccessfulLaunches(e.page, this.startDate, this.endDate).subscribe(data => {
          this.setLaunchFields(data);
        });
      } else {
        this.dataService.getSuccessfulLaunches(e.page).subscribe(data => {
          this.setLaunchFields(data);
        });
      }
    }
    if (this.selectedOption === 'Failed Launches') {
      if (this.selectedOption) {
        this.dataService.getFailedLaunches(e.page, this.startDate, this.endDate).subscribe(data => {
          this.setLaunchFields(data);
        });
      } else {
        this.dataService.getFailedLaunches(e.page).subscribe(data => {
          this.setLaunchFields(data);
        });
      }
    }
  }

  getLaunchesData(selectedOption) {
    if (selectedOption === 'All Launches') {
      this.dataService.getLaunches(1).subscribe(data => {
        this.setLaunchFields(data);
      });
    }
    if (selectedOption === 'Upcoming Launches') {
      this.dataService.getUpcomingLaunches(1).subscribe(data => {
        this.setLaunchFields(data);
      });
    }
    if (selectedOption === 'Successful Launches') {
      this.dataService.getSuccessfulLaunches(1).subscribe(data => {
        this.setLaunchFields(data);
      });
    }
    if (selectedOption === 'Failed Launches') {
      this.dataService.getFailedLaunches(1).subscribe(data => {
        this.setLaunchFields(data);
      });
    }
  }

  getInputSize(datepicker: HTMLInputElement) {
    switch (datepicker.value) {
      case 'Today':
        return 120;
      case 'Yesterday':
        return 140;
      case 'Last 7 Days':
        return 140;
      case 'This Month':
        return 140;
      case 'Last Month':
        return 140;
      case 'Last 30 Days':
        return 150;
    }
  }

  datesUpdated(e: any) {
    if (e.startDate && e.endDate) {
      this.startDate = e.startDate.toISOString();
      this.endDate = e.endDate.toISOString();
      console.log(this.startDate, this.endDate);
      this.dataService.getLaunchesOnSelectedDates(this.currentPage, e.startDate.toISOString(), e.endDate.toISOString(), this.selectedOption).subscribe( data => {
        console.log(data);
        this.setLaunchFields(data);
      })
    }
  }

  setLaunchFields(data) {
    if (data) {
      this.launchesPerPage = data['docs'];
      this.totalLaunches = data['totalDocs'];
    }
  }


  openDatepicker() {
    this.pickerDirective.open();
  }
}
