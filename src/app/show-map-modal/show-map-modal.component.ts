import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-show-map-modal',
  templateUrl: './show-map-modal.component.html',
  styleUrls: ['./show-map-modal.component.scss'],
})
export class ShowMapModalComponent implements OnInit {
  @Input() data: any;

  mapUrl: string = '';
  constructor(
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    const { lat, lon } = this.data.location;
    this.mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon}%2C${lat}%2C${lon}%2C${lat}&amp;layer=mapnik`;

    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl) as string;
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
