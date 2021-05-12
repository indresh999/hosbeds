import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListModalPageModule } from './pages/category-list-modal/category-list-modal.module';
import { LocationModalPageModule } from './pages/location-modal/location-modal.module';
import { TechDetailsModalPageModule } from './pages/tech-details-modal/tech-details-modal.module';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BedsDetailsModalPageModule } from './pages/beds-details-modal/beds-details-modal.module';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AutoCompleteModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BedsDetailsModalPageModule,
    LocationModalPageModule,
    TechDetailsModalPageModule,
    IonicModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    HttpClientModule,
    Geolocation,
    NativeGeocoder,
    AndroidPermissions,
    LocationAccuracy,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
