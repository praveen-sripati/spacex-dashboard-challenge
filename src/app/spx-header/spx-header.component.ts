import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-spx-header',
  templateUrl: './spx-header.component.html',
  styleUrls: ['./spx-header.component.scss']
})
export class SpxHeaderComponent implements OnInit {
  @Input() selectedThemeInner;
  @Output() selectedTheme = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedTheme(theme: string) {
    this.selectedTheme.emit(theme);
    sessionStorage.setItem('selectedTheme', theme);
  }

}
