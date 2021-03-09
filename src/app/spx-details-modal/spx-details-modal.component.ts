import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Launch } from '../data.model';

@Component({
  selector: 'app-spx-details-modal',
  templateUrl: './spx-details-modal.component.html',
  styleUrls: ['./spx-details-modal.component.scss'],
})
export class SpxDetailsModalComponent implements OnInit {
  loaderTheme = {
    backgroundColor: '#87cefa',
    opacity: 0.8,
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: Launch) {}

  ngOnInit(): void {}

}
