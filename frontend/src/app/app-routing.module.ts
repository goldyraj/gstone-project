import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ClientComponent } from './client/client.component';
import { CustomerComponent } from './customer/customer.component';
import { GstupdateComponent } from './gstupdate/gstupdate.component';
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
import { AdminBranchComponent } from './admin-branch/admin-branch.component';
import { AdminHsnCodeComponent } from './admin-hsn-code/admin-hsn-code.component';
import { AdminStateComponent } from './admin-state/admin-state.component';
import { AdminDealerTypeComponent } from './admin-dealer-type/admin-dealer-type.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminFaqsComponent } from './admin-faqs/admin-faqs.component';
import { AdminGovNotificationComponent } from './admin-gov-notification/admin-gov-notification.component';
import { AdminGstoneVideosComponent } from './admin-gstone-videos/admin-gstone-videos.component';
import { UserHsnCodeComponent } from './user-hsn-code/user-hsn-code.component';
import { UserGovNotificationComponent } from './user-gov-notification/user-gov-notification.component';
import { AdminAboutUsComponent } from './admin-about-us/admin-about-us.component';
import { AdminPrivacyPolicyComponent } from './admin-privacy-policy/admin-privacy-policy.component';
import { AdminContactUsComponent } from './admin-contact-us/admin-contact-us.component';
import { AdminInternalUpdatesComponent } from './admin-internal-updates/admin-internal-updates.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PreventLoggedInAccess } from './PreventLoggedInAccess';
import { GstupdateDetailComponent } from './gstupdate-detail/gstupdate-detail.component';
import { AdminInternalUpdateInnerpageComponent } from './admin-internal-update-innerpage/admin-internal-update-innerpage.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminCustomerComponent } from './admin-customer/admin-customer.component';
import { AdminVendorComponent } from './admin-vendor/admin-vendor.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', component: HomeDashboardComponent },
      // { path: 'Register', component: RegistrationComponent },
      // { path: 'DealerType', component: DealerTypeComponent },
      { path: 'update', component: GstupdateComponent },
      { path: 'notification', component: UserGovNotificationComponent },
      { path: 'update-details/:id', component: GstupdateDetailComponent },
      { path: 'videos', component: VideoslinkComponent },
      // { path: 'newinvoice', component: AadNewInvoiceComponent },
      { path: 'admin-login', component: AdminLoginComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'user-hsn', component: UserHsnCodeComponent },
      { path: 'faqs', component: FaqsComponent },
      { path: 'contact', component: ContactComponent },
    ]
  },

  {
    path: 'user', component: UserComponent,
    children: [
      { path: '', component: UserDashboardComponent },
      // { path: '**', redirectTo: '' },
      { path: 'client', component: ClientComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'workreturns', component: WorkreturnsComponent },
      { path: 'goods', component: GoodservicesComponent },
      { path: 'vendor', component: VendorComponent },
      { path: 'editinvoice', component: EditinvoiceComponent },
      { path: 'newinvoice', component: AddnewinvoiceComponent },
      { path: 'gstr', component: Gstr1Component },
      { path: 'edit', component: EditComponent },
      { path: 'summarypage', component: SummaryComponent },
      { path: 'other', component: OtherpageComponent },
      { path: 'addbos', component: AddbosComponent },
      { path: 'exportinv', component: ExportinvoiceComponent },
      { path: 'amendment', component: NewamendmentComponent },
      { path: 'update', component: GstupdateComponent },
      { path: 'notification', component: UserGovNotificationComponent },
      { path: 'videos', component: VideoslinkComponent }
    ]
  },

  {
    path: 'admin', component: AdminDashboardComponent,
    children: [
      { path: 'dashboard', component: AdminHomeComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin-user', component: AdminUserComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin-customer', component: AdminCustomerComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin-branches', component: AdminBranchComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin-vendor', component: AdminVendorComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin-state', component: AdminStateComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin_hsn_code', component: AdminHsnCodeComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin_gov_notification', component: AdminGovNotificationComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin-internal-updates', component: AdminInternalUpdatesComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin-gstone-videos', component: AdminGstoneVideosComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin-about-us', component: AdminAboutUsComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin-privacy-policy', component: AdminPrivacyPolicyComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin-contact-us', component: AdminContactUsComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin-faqs', component: AdminFaqsComponent, canActivate: [PreventLoggedInAccess] },
      { path: 'admin-internal-updates-edit', component: AdminInternalUpdateInnerpageComponent }
    ]

  }
  //{ path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

