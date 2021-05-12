import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  constructor(private authService: AuthService, private callNumber: CallNumber) { }

  ngOnInit() { }

  logoutAction() {
    this.authService.logout();
  }
  callNow() {
    this.callNumber.callNumber("+919503796125", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
