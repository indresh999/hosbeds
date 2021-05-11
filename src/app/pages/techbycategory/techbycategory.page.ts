import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from 'src/app/services/feed.service';
import { ToastService } from 'src/app/services/toast.service';
import { TechDetailsModalPage } from '../tech-details-modal/tech-details-modal.page';

@Component({
  selector: 'app-techbycategory',
  templateUrl: './techbycategory.page.html',
  styleUrls: ['./techbycategory.page.scss'],
})
export class TechbycategoryPage implements OnInit {

  page_number = 1;
  techData = [];
  postData = {
    user_id: '',
    token: '',
    pid: 1,
    limit: 10,
    category:'Electrician',
    tech_id:''
  };

  constructor( private auth: AuthService,
    private feedService: FeedService,
    private toastService: ToastService,
    public actionSheetController: ActionSheetController,
    public activatedRoutes : ActivatedRoute,
    private modalController: ModalController) { }

  ngOnInit() {
    this.postData.category = this.activatedRoutes.snapshot.paramMap.get('category');
    this.techsData(false,"");
  }

  techsData(isFirstLoad, event) {

    this.feedService.techByCategory(this.postData).subscribe(
      (res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          this.techData.push(res.data[i]);
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

}
