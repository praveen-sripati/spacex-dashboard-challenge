import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private API_BASE_URL = 'https://api.spacexdata.com/v4';
  commonOptions = {
    sort: {
      date_utc: 1,
    },
    select: {
      name: 1,
      date_utc: 1,
      failures: 1,
      success: 1,
      upcoming: 1,
    },
    populate: [
      {
        path: 'payloads',
        select: {
          orbit: 1,
        },
      },
      {
        path: 'rocket',
        select: {
          name: 1,
        },
      },
      {
        path: 'launchpad',
        select: {
          name: 1,
        },
      },
    ],
  };

  constructor(private httpClient: HttpClient) {}

  getDateParams(startDate: Date, endDate: Date) {
    let dateParams = {}
    if (startDate && endDate) {
      dateParams = {
        date_utc: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    } else {
      dateParams = {}
    }
    return dateParams
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getLaunches(pageNumber: number, startDate?: Date, endDate?: Date) {
    return this.httpClient
      .post(
        this.API_BASE_URL + '/launches/query',
        {
          query: {
            ...this.getDateParams(startDate, endDate)
          },
          options: {
            page: pageNumber,
            ...this.commonOptions,
          },
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  getUpcomingLaunches(pageNumber: number, startDate?: Date, endDate?: Date) {
    return this.httpClient
      .post(
        this.API_BASE_URL + '/launches/query',
        {
          query: {
            upcoming: true,
            ...this.getDateParams(startDate, endDate)
          },
          options: {
            page: pageNumber,
            ...this.commonOptions,
          },
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  getSuccessfulLaunches(pageNumber: number, startDate?: Date, endDate?: Date) {
    return this.httpClient
      .post(
        this.API_BASE_URL + '/launches/query',
        {
          query: {
            success: true,
            ...this.getDateParams(startDate, endDate)
          },
          options: {
            page: pageNumber,
            ...this.commonOptions,
          },
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  getFailedLaunches(pageNumber: number, startDate?: Date, endDate?: Date) {
    return this.httpClient
      .post(
        this.API_BASE_URL + '/launches/query',
        {
          query: {
            'failures.0': { $exists: true },
            ...this.getDateParams(startDate, endDate)
          },
          options: {
            page: pageNumber,
            ...this.commonOptions,
          },
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  getLaunchesOnSelectedDates(
    pageNumber: number,
    startDate: Date,
    endDate: Date,
    selectedOption: string
  ) {
    // return this.httpClient
    //   .post(
    //     this.API_BASE_URL + '/launches/query',
    //     {
    //       query: {
    //         date_utc: {
    //           $gte: startDate,
    //           $lte: endDate,
    //         },
    //       },
    //       options: {
    //         page: pageNumber,
    //         ...this.commonOptions,
    //       },
    //     },
    //     {
    //       headers: new HttpHeaders({
    //         'Content-Type': 'application/json',
    //       }),
    //     }
    //   )
    //   .pipe(retry(3), catchError(this.handleError));
    console.log(selectedOption);
    switch (selectedOption) {
      case 'All Launches':
        return this.getLaunches(pageNumber, startDate, endDate);
      case 'Upcoming Launches':
        return this.getUpcomingLaunches(pageNumber, startDate, endDate);
      case 'Successful Launches':
        return this.getSuccessfulLaunches(pageNumber, startDate, endDate);
      case 'Failed Launches':
        return this.getFailedLaunches(pageNumber, startDate, endDate);
    }
  }
}
