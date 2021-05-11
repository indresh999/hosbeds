import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from 'src/app/services/feed.service';
import { ToastService } from 'src/app/services/toast.service';
import { CategoryListModalPage } from '../category-list-modal/category-list-modal.page';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  postData = {
    categories:'Electrician',
    name: '',
    mobile: '',
    whatsapp:'',
    basefare:'',
    file:'',
    address:'',
    city:'',
    state:'',
    experience:''
  };
  
  constructor(  
    private auth: AuthService,
    private feedService: FeedService,
    private toastService: ToastService,
    private loadinController: LoadingController,
    private modalController: ModalController) { }

  async categoryModal() {
    const modal = await this.modalController.create({
      component: CategoryListModalPage,
      cssClass: 'half-modal'
    });
    return await modal.present();
  }
  ngOnInit() {
  }

  validateInputs() {
    let name = this.postData.name.trim();
    let categories = this.postData.categories.trim();
    let city = this.postData.city.trim();
    let address = this.postData.address.trim();
    return (
      this.postData.name &&
      this.postData.categories &&
      this.postData.basefare &&
      this.postData.address &&
      categories.length > 0 &&
      name.length > 0 &&
      city.length > 0 &&
      address.length > 0
    );
  }

  createTech() {
    if (this.validateInputs()) {
      this.feedService.createTech(this.postData).subscribe(
       // this.loadinController.create(null, 90)
        (res: any) => {
          if (res.data) {
            // Storing the User data.
            this.toastService.presentToast(
              'Created Succussfully...'
            );
          } else {
            this.toastService.presentToast(
              'Data alreay exists, please enter new details.'
            );
          }
        },
        (error: any) => {
          this.toastService.presentToast('Network Issue.');
        }
      );
    } else {
      this.toastService.presentToast(
        'Somthing wrong...'
      );
    }
  }
}
