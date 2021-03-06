import {
  Component,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { Subject } from 'rxjs';
import { Launch, SorterOption } from './data.model';
import { DataService } from './data.service';
import { LoadingService } from './loading.service';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  //Theme variables
  selectedTheme: string = 'light';

  // Daterange Picker variables
  @ViewChild(DaterangepickerDirective, { static: false })
  pickerDirective: DaterangepickerDirective;
  inputSizes: {};
  selected: any;
  alwaysShowCalendars: boolean;
  localeConfig = {
    format: 'MM/DD/YYYY',
    displayFormat: 'DD MMM y',
    direction: 'ltr',
    separator: ' To ',
    cancelLabel: 'Cancel',
    customRangeLabel: 'Custom range',
  };
  ranges: any = {
    'Past week': [
      moment().subtract(1, 'week').startOf('week'),
      moment().subtract(1, 'week').endOf('week'),
    ],
    'Past month': [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month'),
    ],
    'Past 3 months': [
      moment().subtract(3, 'months').startOf('month'),
      moment().subtract(1, 'month').endOf('month'),
    ],
    'Past 6 months': [
      moment().subtract(6, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month'),
    ],
    'Past year': [
      moment().subtract(1, 'year').startOf('year'),
      moment().subtract(1, 'month').endOf('month'),
    ],
    'Past 2 years': [
      moment().subtract(2, 'year').startOf('year'),
      moment().subtract(1, 'month').endOf('month'),
    ],
  };

  // Table Headers
  selectedSortOption: SorterOption;
  tableHeaders = ['Mission', 'Orbit', 'Launch Status', 'Rockets'];

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

  constructor(
    private dataService: DataService,
    public loadingService: LoadingService,
    private themeService: ThemeService
  ) {
    this.alwaysShowCalendars = true;
  }

  ngOnInit() {
    if (sessionStorage.getItem('selectedTheme')) {
      this.selectedTheme = sessionStorage.getItem('selectedTheme');
      if(this.selectedTheme === 'dark') {
        this.themeService.toggleDark();
      } else {
        this.themeService.toggleLight();
      }
    } else {
      sessionStorage.setItem('selectedTheme', this.selectedTheme);
      this.themeService.toggleLight();
    }

    if (sessionStorage.getItem('selectedOption')) {
      this.selectedOption = sessionStorage.getItem('selectedOption');
    }

    if (sessionStorage.getItem('selectedDate')) {
      const selectedDate = sessionStorage.getItem('selectedDate');
      let parsedDate = JSON.parse(selectedDate);
      if (parsedDate.startDate && parsedDate.endDate) {
        this.selected = {
          startDate: moment(parsedDate.startDate),
          endDate: moment(parsedDate.endDate),
        };
      } else {
        this.selected = {
          startDate: null,
          endDate: null,
        };
      }
    }
    this.getLaunchesData(this.selectedOption);
  }

  ngOnChanges() {}

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
    this.loadingService.startLoading();
    if (this.selectedOption === 'All Launches') {
      this.dataService
        .getLaunches(
          e.page,
          this.selected?.startDate?.toISOString(),
          this.selected?.endDate?.toISOString(),
          this.selectedSortOption
        )
        .subscribe((data) => {
          this.setLaunchFields(data);
        });
    }
    if (this.selectedOption === 'Upcoming Launches') {
      this.dataService
        .getUpcomingLaunches(
          e.page,
          this.selected?.startDate?.toISOString(),
          this.selected?.endDate?.toISOString(),
          this.selectedSortOption
        )
        .subscribe((data) => {
          this.setLaunchFields(data);
        });
    }
    if (this.selectedOption === 'Successful Launches') {
      this.dataService
        .getSuccessfulLaunches(
          e.page,
          this.selected?.startDate?.toISOString(),
          this.selected?.endDate?.toISOString(),
          this.selectedSortOption
        )
        .subscribe((data) => {
          this.setLaunchFields(data);
        });
    }
    if (this.selectedOption === 'Failed Launches') {
      this.dataService
        .getFailedLaunches(
          e.page,
          this.selected?.startDate?.toISOString(),
          this.selected?.endDate?.toISOString(),
          this.selectedSortOption
        )
        .subscribe((data) => {
          this.setLaunchFields(data);
        });
    }
  }

  getLaunchesData(selectedOption) {
    this.loadingService.startLoading();
    if (selectedOption === 'All Launches') {
      this.dataService
        .getLaunches(
          1,
          this.selected?.startDate?.toISOString(),
          this.selected?.endDate?.toISOString(),
          this.selectedSortOption
        )
        .subscribe((data) => {
          this.setLaunchFields(data);
        });
    }
    if (selectedOption === 'Upcoming Launches') {
      this.dataService
        .getUpcomingLaunches(
          1,
          this.selected?.startDate?.toISOString(),
          this.selected?.endDate?.toISOString(),
          this.selectedSortOption
        )
        .subscribe((data) => {
          this.setLaunchFields(data);
        });
    }
    if (selectedOption === 'Successful Launches') {
      this.dataService
        .getSuccessfulLaunches(
          1,
          this.selected?.startDate?.toISOString(),
          this.selected?.endDate?.toISOString(),
          this.selectedSortOption
        )
        .subscribe((data) => {
          this.setLaunchFields(data);
        });
    }
    if (selectedOption === 'Failed Launches') {
      this.dataService
        .getFailedLaunches(
          1,
          this.selected?.startDate?.toISOString(),
          this.selected?.endDate?.toISOString(),
          this.selectedSortOption
        )
        .subscribe((data) => {
          this.setLaunchFields(data);
        });
    }
  }

  getInputSize(datepicker: HTMLInputElement) {
    switch (datepicker.value) {
      case 'Past week':
        return 140;
      case 'Past month':
        return 140;
      case 'Past 3 months':
        return 150;
      case 'Past 6 months':
        return 150;
      case 'Past year':
        return 140;
      case 'Past 2 years':
        return 150;
    }
  }

  datesUpdated(e: any) {
    this.getLaunchesData(this.selectedOption);
    sessionStorage.setItem('selectedDate', JSON.stringify(this.selected));
  }

  setLaunchFields(data) {
    if (data) {
      this.launchesPerPage = data['docs'];
      this.totalLaunches = data['totalDocs'];
      this.loadingService.stopLoading();
    }
  }

  selectedSort(selectedSortOption) {
    this.selectedSortOption = selectedSortOption;
    this.getLaunchesData(this.selectedOption);
  }

  openDatepicker() {
    this.pickerDirective.open();
  }

  onSelectedTheme(theme: string) {
    this.selectedTheme = theme;
    if (this.selectedTheme === 'dark') {
      this.themeService.toggleDark();
      console.log('in onchanges');
    } else {
      this.themeService.toggleLight();
      console.log('in onchanges');
    }
  }
}
