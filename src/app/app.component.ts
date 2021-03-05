import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spaceX';
  launchFilters = [
    'All Launches',
    'Upcoming Launches',
    'Successful Launches',
    'Failed Launches'
  ]
}
