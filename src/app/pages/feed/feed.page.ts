import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FeedService } from 'src/app/services/feed.service';
import { LocationModalPage } from '../location-modal/location-modal.page';
import { TechDetailsModalPage } from '../tech-details-modal/tech-details-modal.page';
import { AuthService } from './../../services/auth.service';
import { ToastService } from './../../services/toast.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { BedsDetailsModalPage } from '../beds-details-modal/beds-details-modal.page';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss']
})
export class FeedPage implements OnInit {

  public authUser: any;
  ishidden = false;
  page_number = 1;
  allCategory = [];
  allCategory2 = [];
  banner = [];
  postData = {
    user_id: '',
    token: '',
    pid: 1,
    limit: 10,
    latitude: 0,
    longitude: 0,
    type: 1
  };

  slideOpts = {
    speed: 400,
    slideShadows: true,
    autoplay: true,
  };

  address: string;
  locationCoords: any;
  timetest: any;

  isItemAvailable = false;
  items = [];

  initializeItems() {
    this.items = this.allCategory2;
  }
  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };


  constructor(
    private auth: AuthService,
    private feedService: FeedService,
    private toastService: ToastService,
    private modalController: ModalController,
    private router: Router,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private callNumber: CallNumber
  ) {
    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
    this.timetest = Date.now();

  }

  ngOnInit() {
    this.checkGPSPermission();
    this.hospitalData(false, "");
    this.bannerData();
  }

  hospitalData(isFirstLoad, event) {
    this.items = [];
    this.allCategory = []
    this.allCategory2 = []
    this.feedService.allHospitals(this.postData).subscribe(
      (res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          this.allCategory.push(res.data[i]);
          this.allCategory2.push(res.data[i]['name']);
        }
        console.log(this.allCategory);
        if (isFirstLoad)
          event.target.complete();
        this.page_number++;
        this.postData.pid = this.page_number;
      },
      (error: any) => {
        this.toastService.presentToast('Somthing wrong..');
      }
    );
  }
  bannerData() {
    this.feedService.banners(this.postData).subscribe(
      (res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          this.banner.push(res.data[i]);
        }
      },
      (error: any) => {
        this.toastService.presentToast('Somthing wrong..');
      }
    );
  }


  //Check if application having GPS access permission  
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }
  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;

      this.postData.latitude = resp.coords.latitude;
      this.postData.longitude = resp.coords.longitude;

    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }
  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }








  /**Extra functions */
  async locationModal() {
    const modal = await this.modalController.create({
      component: LocationModalPage,
      cssClass: 'half-modal'
    });
    return await modal.present();
  }
  async bedsDetailsModal() {
    const modal = await this.modalController.create({
      component: BedsDetailsModalPage,
      cssClass: 'half-modal'
    });
    return await modal.present();
  }
  async techDetailsModal(tech_id) {
    const modal = await this.modalController.create({
      component: TechDetailsModalPage,
      componentProps: {
        'tech_id': tech_id,
      },
      cssClass: 'half-modal'
    });
    return await modal.present();
  }
  techByCategory(category) {
    console.log(category)
    this.router.navigate(['./home/techbycategory', { category: category }]);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }
  onScroll(event) {
    if (event.detail.deltaY > 0) {
      this.ishidden = true;
    } else if (event.detail.deltaY < 0) {
      this.ishidden = false;
    }
  }
}
