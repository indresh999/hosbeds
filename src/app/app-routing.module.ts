import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },  { path: 'beds-details-modal', loadChildren: './pages/beds-details-modal/beds-details-modal.module#BedsDetailsModalPageModule' },

  /*
  { path: 'location-modal', loadChildren: './pages/location-modal/location-modal.module#LocationModalPageModule' },
  { path: 'tech-details-modal', loadChildren: './pages/tech-details-modal/tech-details-modal.module#TechDetailsModalPageModule' },
  { path: 'category-list-modal', loadChildren: './pages/category-list-modal/category-list-modal.module#CategoryListModalPageModule' },
  { path: 'techbycategory', loadChildren: './pages/techbycategory/techbycategory.module#TechbycategoryPageModule' }
*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

