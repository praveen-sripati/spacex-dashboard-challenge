import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spx-table',
  templateUrl: './spx-table.component.html',
  styleUrls: ['./spx-table.component.scss']
})
export class SpxTableComponent implements OnInit {
  @Input() tableHeaders: string[];
  @Input() data: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
