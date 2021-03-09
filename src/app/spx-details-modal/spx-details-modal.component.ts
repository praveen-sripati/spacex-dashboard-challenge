import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Launch } from '../data.model';
import { LoadingService } from '../loading.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
  loadingImage: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Launch,
    public loadingService: LoadingService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'icon-nasa',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/nasa.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'icon-wiki',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/wiki.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'icon-youtube',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/youtube.svg'
      )
    );

    // this.loadingService.startLoading();
  }

  ngOnInit(): void {}

  AfterViewInit() {}

  onLoad() {
    this.loadingImage = false;
  }
}
