import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from 'src/app/services/feed.service';
import { ToastService } from 'src/app/services/toast.service';
import { TechDetailsModalPage } from '../tech-details-modal/tech-details-modal.page';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  page_number = 1;
  ishidden =false;
  selectTabs = '';
  categorydata = [];
  techsData = [];
  techData = [];
  postData = {
    user_id: '',
    token: '',
    pid: 1,
    limit: 10,
    category:'',
    tech_id:''
  };
  constructor( private auth: AuthService,
    private feedService: FeedService,
    private toastService: ToastService,
    public actionSheetController: ActionSheetController,
    private modalController: ModalController) { }

  ngOnInit() {
    this.categoryData(false, "");
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

  onScroll(event) {
    if (event.detail.deltaY > 0) {
      this.ishidden = true;
    } else if (event.detail.deltaY < 0) {
      this.ishidden = false;
    }
  }

    async openSort() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Sort By',
      cssClass: 'my-custom-class',
      animated: false,
      mode: 'ios',
      buttons: [{
        text: 'Top Technicians',
        role: 'destructive',
        cssClass: 'EditionIcon',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Budget Technicians',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  categoryData(isFirstLoad, event) {

    this.feedService.allServices(this.postData).subscribe(
      (res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          this.categorydata.push(res.data[i]);
        }
        this.selectTabs = res.data[0].name;
        this.postData.category = this.selectTabs;

        if(this.postData.category)
        this.getTechsByCategory(false,"");

        console.log(this.postData.category);
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
  getTechsByCategory(isFirstLoad, event) {

    this.techsData = [];
    this.feedService.techByCategory(this.postData).subscribe(
      (res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          this.techsData.push(res.data[i]);
          console.log(this.techsData)
        }
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
segmentChanged(event) {
  this.postData.category = event.detail.value;
  if(this.postData.category)
  {
    console.log(this.postData.category)
  this.getTechsByCategory(false,"");
  }
}

}
