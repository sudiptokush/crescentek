import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent
}, {
  path: 'customer',
  loadChildren: () => import('src/app/pages/customer/customer.module').then(m => m.CustomerModule) 
}, {
  path: 'settings',
  component: SettingsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
