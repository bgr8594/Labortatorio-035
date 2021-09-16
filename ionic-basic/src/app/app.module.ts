import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentesModule } from './componentes/componentes.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ComponentesModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [NavParams, HttpClientModule, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
