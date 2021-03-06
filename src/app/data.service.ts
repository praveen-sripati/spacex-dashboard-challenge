import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private API_BASE_URL = 'https://api.spacexdata.com/v4';

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

  getLaunches(pageNumber: number) {
    return this.httpClient.post(
      this.API_BASE_URL  + '/launches/query',
      {
        query: {},
        options: {
          "page": pageNumber,
          "select": {
            "name": 1,
            "date_utc": 1,
            "failures": 1,
            "success": 1,
            "upcoming": 1
          },
          "populate": [
            {
              "path": "payloads",
              "select": {
                "orbit": 1
              }
            },
            {
              "path": "rocket",
              "select": {
                "name": 1
              }
            },
            {
              "path": "launchpad",
              "select": {
                "name": 1
              }
            }
          ]
        },
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    ).pipe(retry(3), catchError(this.handleError));
  }

  getUpcomingLaunches() {
    // return this.httpClient.get(this.API_BASE_URL + '/launches/upcoming');
    return this.httpClient.post(
      this.API_BASE_URL  + '/launches/query',
      {
        query: {
          "upcoming": true
        },
        options: {
          "select": {
            "name": 1,
            "date_utc": 1,
            "failures": 1,
            "success": 1,
            "upcoming": 1
          },
          "populate": [
            {
              "path": "payloads",
              "select": {
                "orbit": 1
              }
            },
            {
              "path": "rocket",
              "select": {
                "name": 1
              }
            },
            {
              "path": "launchpad",
              "select": {
                "name": 1
              }
            }
          ]
        },
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    ).pipe(retry(3), catchError(this.handleError));;
  }
}
