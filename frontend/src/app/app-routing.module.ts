import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ClientComponent } from './client/client.component';
import { CustomerComponent } from './customer/customer.component';
import { GstupdateComponent } from './gstupdate/gstupdate.component';
import { NotificationComponent } from './notification/notification.component';
import { VideoslinkComponent } from './videoslink/videoslink.component';
import { Gstr1Component } from './gstr-1/gstr-1.component';
import { EditComponent } from './edit/edit.component';
import { WorkreturnsComponent } from './workreturns/workreturns.component';
import { GoodservicesComponent } from './goodservices/goodservices.component';
//import { AadNewInvoiceComponent } from './aad-new-invoice/aad-new-invoice.component';
import { VendorComponent } from './vendor/vendor.component';
import { EditinvoiceComponent } from './editinvoice/editinvoice.component';
import { SummaryComponent } from './summary/summary.component';
import { AddnewinvoiceComponent } from './addnewinvoice/addnewinvoice.component';
import { AddbosComponent } from './addbos/addbos.component';
import { ExportinvoiceComponent } from './exportinvoice/exportinvoice.component';
import { NewamendmentComponent } from './newamendment/newamendment.component';
import { OtherpageComponent } from './otherpage/otherpage.component';
import{AdminBranchComponent} from './admin-branch/admin-branch.component';
import{AdminHsnCodeComponent} from './admin-hsn-code/admin-hsn-code.component';
import{AdminStateComponent} from './admin-state/admin-state.component';
import{AdminDealerTypeComponent} from './admin-dealer-type/admin-dealer-type.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import { AdminFaqsComponent } from './admin-faqs/admin-faqs.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin-hsn-code', pathMatch: 'full' },
  {path:'demo',component:AdminBranchComponent},
  { path: 'home', component: HomeComponent },
  { path: 'Register', component: RegistrationComponent },
  { path: 'user', component: UserComponent },
  { path: 'client', component: ClientComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'update', component: GstupdateComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'videos', component: VideoslinkComponent },
  { path: 'gstr', component: Gstr1Component },
  { path: 'edit', component: EditComponent },
  { path: 'workreturns', component: WorkreturnsComponent },
  { path: 'goods', component: GoodservicesComponent },
  { path: 'vendor', component: VendorComponent },
  //{ path: 'newinvoice', component: AadNewInvoiceComponent },
  { path: 'editinvoice', component: EditinvoiceComponent },
  { path: 'summarypage', component: SummaryComponent },
  { path: 'newinvoice', component: AddnewinvoiceComponent },
  { path: 'addbos', component: AddbosComponent },
  { path: 'exportinv', component: ExportinvoiceComponent },
  { path: 'amendment', component: NewamendmentComponent },
  { path: 'other', component: OtherpageComponent },
  {path: 'admin-hsn-code',component:AdminHsnCodeComponent},
  {path:'admin-state',component:AdminStateComponent},
  {path:'admin-dealer-type',component:AdminDealerTypeComponent},
  {path: 'admin-dashboard',component: AdminDashboardComponent},
  {path:'admin-login',component:AdminLoginComponent},
  {path:'admin-faqs', component:AdminFaqsComponent}
  //{ path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

