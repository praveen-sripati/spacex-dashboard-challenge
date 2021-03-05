import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss']
})
export class StatusChipComponent implements OnInit {
  @Input() status: string;    // Has 3 values 'success', 'failed', 'upcoming'

  constructor() { }

  ngOnInit(): void {
  }

}
