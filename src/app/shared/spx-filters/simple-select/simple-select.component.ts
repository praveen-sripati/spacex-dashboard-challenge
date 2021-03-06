import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-select',
  templateUrl: './simple-select.component.html',
  styleUrls: ['./simple-select.component.scss']
})
export class SimpleSelectComponent implements OnInit {
  @Input() selectOptions: string[];
  @Output() onSelected = new EventEmitter<string>();
  selectedOption: string = 'All Launches';

  constructor() { }

  ngOnInit(): void {
    this.selectedOption = sessionStorage.getItem("selectedOption");
  }

  onSelect(option) {
    this.selectedOption = option;
    this.onSelected.emit(option);
  }
}
