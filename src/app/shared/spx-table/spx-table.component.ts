import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Launch } from 'src/app/data.model';
import { SpxDetailsModalComponent } from '../../spx-details-modal/spx-details-modal.component';
import { LoadingService } from '../../loading.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-spx-table',
  templateUrl: './spx-table.component.html',
  styleUrls: ['./spx-table.component.scss'],
})
export class SpxTableComponent implements OnInit {
  @Output() selectedSortOption = new EventEmitter<string>()
  @Input() tableHeaders: string[];
  @Input() data: any[];
  selectedOption;
  launchedSortOrder: number = 1;
  locationSortOrder: number = 1;
  loaderTheme = {
    backgroundColor: '#87cefa',
    opacity: 0.8,
    height: "18px"
  };

  constructor(
    public dialog: MatDialog,
    public loadingService: LoadingService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'icon-sort-down',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/sort-down.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'icon-sort-up',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/sort-up.svg'
      )
    );
  }

  ngOnInit(): void {}

  openDialog(launch: Launch) {
    this.dialog.open(SpxDetailsModalComponent, {
      width: '550px',
      data: {
        ...launch,
      },
    });
  }

  sortData(item: string) {
    let sortedInfo;
    this.selectedOption = item;
    switch(item) {
      case 'Launched':
        sortedInfo = {
          date_utc: this.launchedSortOrder === -1 ? 1 : -1
        }
        break
      case 'Mission':
        sortedInfo = {
          name: this.locationSortOrder === -1 ? 1 : -1
        }
    }
    console.log(sortedInfo);
    this.selectedSortOption.emit({...sortedInfo});
    this.launchedSortOrder = (this.selectedOption === 'Launched') && this.launchedSortOrder === -1 ? 1 : -1;
    this.locationSortOrder = (this.selectedOption === 'Mission') && this.locationSortOrder === -1 ? 1 : -1;
  }
}
