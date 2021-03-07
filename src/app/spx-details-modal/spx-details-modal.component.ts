import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-spx-details-modal',
  templateUrl: './spx-details-modal.component.html',
  styleUrls: ['./spx-details-modal.component.scss'],
})
export class SpxDetailsModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {}
}
