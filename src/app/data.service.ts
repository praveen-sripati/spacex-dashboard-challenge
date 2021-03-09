import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { SorterOption } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private API_BASE_URL = 'https://api.spacexdata.com/v4';
  commonOptions = {
    // sort: {
    //   date_utc: 1,
    // },
    select: {
      name: 1,
      date_utc: 1,
      failures: 1,
      success: 1,
      upcoming: 1,
      links: {
        patch: {
          small: 1
        },
        article: 1,
        webcast: 1,
        wikipedia: 1,
      },
      details: 1,
      flight_number: 1,
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
          engines: {
            type: 1
          },
          name: 1,
          company: 1
        },
      },
      {
        path: 'launchpad',
        select: {
          name: 1,
        },
      },
      {
        path: 'capsules',
        select: {
          type: 1,
        }
      }
    ],
  };

  constructor(private httpClient: HttpClient) {}

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

  getDateParams(startDate: Date, endDate: Date) {
    let dateParams = {};
    if (startDate && endDate) {
      dateParams = {
        date_utc: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    } else {
      dateParams = {};
    }
    return dateParams;
  }

  getLaunches(pageNumber: number, startDate?: Date, endDate?: Date, sortedOption?: SorterOption) {
    return this.getLaunchApiConfig({}, pageNumber, startDate, endDate, sortedOption);
  }

  getUpcomingLaunches(pageNumber: number, startDate?: Date, endDate?: Date, sortedOption?: SorterOption) {
    return this.getLaunchApiConfig(
      { upcoming: true },
      pageNumber,
      startDate,
      endDate,
      sortedOption
    );
  }

  getSuccessfulLaunches(pageNumber: number, startDate?: Date, endDate?: Date, sortedOption?: SorterOption) {
    return this.getLaunchApiConfig(
      { success: true },
      pageNumber,
      startDate,
      endDate,
      sortedOption
    );
  }

  getFailedLaunches(pageNumber: number, startDate?: Date, endDate?: Date, sortedOption?: SorterOption) {
    return this.getLaunchApiConfig(
      { 'failures.0': { $exists: true } },
      pageNumber,
      startDate,
      endDate,
      sortedOption
    );
  }

  getLaunchApiConfig(
    query: {},
    pageNumber: number,
    startDate: Date,
    endDate: Date,
    sortedOption: SorterOption
  ) {
    console.log(sortedOption);
    return this.httpClient
      .post(
        this.API_BASE_URL + '/launches/query',
        {
          query: {
            ...query,
            ...this.getDateParams(startDate, endDate),
          },
          options: {
            page: pageNumber,
            sort: sortedOption,
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
}
