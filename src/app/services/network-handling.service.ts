import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { EventEmitter } from '@angular/core';

enum NetworkStatus {
  Online = 1,
  Offline = 0
}

@Injectable({
  providedIn: 'root'
})
export class NetworkHandlingService {

  public event: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  async init() {
    const status = await Network.getStatus();
    this.event.emit(status.connected);
    Network.addListener('networkStatusChange', (status) => {
      this.event.emit(status.connected);
    });
  }

  async isOnline() {
    const status = await Network.getStatus();
    return status.connected;
  }

  async isOffline() {
    const status = await Network.getStatus();
    return !status.connected;
  }

  async getNetworkStatus() {
    const status = await Network.getStatus();
    if (status.connected) {
      return NetworkStatus.Online;
    } else {
      return NetworkStatus.Offline;
    }
  }
}
