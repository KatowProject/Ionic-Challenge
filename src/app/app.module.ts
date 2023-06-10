import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowMapModalComponent } from './show-map-modal/show-map-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  declarations: [AppComponent, ShowMapModalComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
