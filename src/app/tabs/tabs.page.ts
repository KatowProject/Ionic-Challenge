import { Component, OnInit } from '@angular/core';
import { NetworkHandlingService } from '../services/network-handling.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    public networkHandlingService: NetworkHandlingService,
    public toastController: ToastController
  ) {
  }

  ngOnInit() {
    this.networkHandlingService.init();

    this.networkHandlingService.event.subscribe((status) => {
      if (status) {
        console.log('Network is online');
      } else {
        console.log('Network is offline');
      }
    });
  }

}
