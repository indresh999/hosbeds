import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-beds-details-modal',
  templateUrl: './beds-details-modal.page.html',
  styleUrls: ['./beds-details-modal.page.scss'],
})
export class BedsDetailsModalPage implements OnInit {


  constructor(private router: Router, public modalController: ModalController, public alertController: AlertController, private auth: AuthService,
  ) {

  }

  ngOnInit() {

  }
  dismiss() {
    this.modalController.dismiss();
  }

}
