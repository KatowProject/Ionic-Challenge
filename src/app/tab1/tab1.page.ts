import { ToastController } from '@ionic/angular';
import { GeoLocationService } from './../services/geo-location.service';
import { Component } from '@angular/core';
import { StorageManagementService } from '../services/storage-management.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  form: any = {};
  constructor(
    private geoLocationService: GeoLocationService,
    private toastController: ToastController,
    private storageManagementService: StorageManagementService
  ) { }

  inputCheck() {
    if (
      !this.form.nik || !this.form.nama || !this.form.tempat_lahir ||
      !this.form.tanggal_lahir || !this.form.jenis_kelamin || !this.form.alamat ||
      !this.form.agama || !this.form.status_perkawinan || !this.form.pekerjaan ||
      !this.form.kewarganegaraan || !this.form.berlaku_hingga
    ) {
      this.toastController.create({
        message: 'Mohon lengkapi data',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());

      return false;
    }
    return true;
  }
  async sendToWhatsapp() {
    const isValid = this.inputCheck();
    if (!isValid) return;

    const location = await this.getLocation();
    this.form.lokasi = location.display_name;
    this.form.location = location;
    this.form.type = 'whatsapp';

    const form = Object.keys(this.form);
    const output = form.map((key) => {
      if (key === 'location') return;
      return `*${key.toUpperCase()}*: ${this.form[key]}`;
    }).join('%0A');

    window.open(`https://api.whatsapp.com/send?phone=6285156024790&text=${output}`, '_blank');

    // save data to storage
    this.storageManagementService.addData(this.form);
  }

  async sendToTelegram() {
    const isValid = this.inputCheck();
    if (!isValid) return;

    const location = await this.getLocation();
    this.form.lokasi = location.display_name;
    this.form.type = 'telegram';


    const form = Object.keys(this.form);
    const output = form.map((key) => {
      return `*${key.toUpperCase()}*: ${this.form[key]}`;
    }).join('%0A');


    window.open(`https://t.me/Katoww_Bot?start=${output}`, '_blank');
  }

  async sendToEmail() {
    const isValid = this.inputCheck();
    if (!isValid) return;

    const location = await this.getLocation();
    this.form.lokasi = location.display_name;
    this.form.location = location;
    this.form.type = 'email';

    const form = Object.keys(this.form);
    const output = form.map((key) => {
      // bold text on mailto: body
      if (key === 'location') return;
      return `${key.toUpperCase()}: ${this.form[key]}`;
    }).join('%0A');

    const url = `mailto:naufalfaqih443@gmail.com?subject=Data&20Informasi&body=${output}`;

    window.open(url, '_blank');

    // save data to storage
    this.storageManagementService.addData(this.form);
  }

  async getLocation() {
    const positition = await this.geoLocationService.getLocation();
    const { latitude, longitude, accuracy } = positition.coords;

    // get address
    const getAddress = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    const address = await getAddress.json();

    return address;
  }
}
