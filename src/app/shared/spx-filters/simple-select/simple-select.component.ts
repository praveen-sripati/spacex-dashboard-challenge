import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-select',
  templateUrl: './simple-select.component.html',
  styleUrls: ['./simple-select.component.scss']
})
export class SimpleSelectComponent implements OnInit {
  @Input() selectOptions: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
