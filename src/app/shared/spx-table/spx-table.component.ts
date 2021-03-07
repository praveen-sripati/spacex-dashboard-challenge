import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Launch } from 'src/app/data.model';
import { SpxDetailsModalComponent } from '../../spx-details-modal/spx-details-modal.component';

@Component({
  selector: 'app-spx-table',
  templateUrl: './spx-table.component.html',
  styleUrls: ['./spx-table.component.scss'],
})
export class SpxTableComponent implements OnInit {
  @Input() tableHeaders: string[];
  @Input() data: any[];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(launch: Launch) {
    this.dialog.open(SpxDetailsModalComponent, {
      width: "550px",
      data: {
        ...launch
      },
    });
  }
}
