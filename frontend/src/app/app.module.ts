import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { CustomerComponent } from './customer/customer.component';
import { ClientComponent } from './client/client.component';
import { VideoslinkComponent } from './videoslink/videoslink.component';
import { GstupdateComponent } from './gstupdate/gstupdate.component';
import { Gstr1Component } from './gstr-1/gstr-1.component';
import { EditComponent } from './edit/edit.component';
import { WorkreturnsComponent } from './workreturns/workreturns.component';
import { GoodservicesComponent } from './goodservices/goodservices.component';
import { AadNewInvoiceComponent } from './aad-new-invoice/aad-new-invoice.component';
import { VendorComponent } from './vendor/vendor.component';
import { EditinvoiceComponent } from './editinvoice/editinvoice.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SummaryComponent } from './summary/summary.component';
import { AddnewinvoiceComponent } from './addnewinvoice/addnewinvoice.component';
import { AddbosComponent } from './addbos/addbos.component';
import { ExportinvoiceComponent } from './exportinvoice/exportinvoice.component';
import { NewamendmentComponent } from './newamendment/newamendment.component';
import { AdminBranchComponent } from './admin-branch/admin-branch.component';
import { OtherpageComponent } from './otherpage/otherpage.component';
import { AdminHsnCodeComponent } from './admin-hsn-code/admin-hsn-code.component';
import { AdminDealerTypeComponent } from './admin-dealer-type/admin-dealer-type.component';
import { AdminStateComponent } from './admin-state/admin-state.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ApiserviceService } from './apiservice.service';
import { AdminFaqsComponent } from './admin-faqs/admin-faqs.component';
import { AdminGovNotificationComponent } from './admin-gov-notification/admin-gov-notification.component';
import { AdminGoodsComponent } from './admin-goods/admin-goods.component';
import { AdminGstoneVideosComponent } from './admin-gstone-videos/admin-gstone-videos.component'
import { ExcelServiceService } from './excel-service.service';
import { UserHsnCodeComponent } from './user-hsn-code/user-hsn-code.component';
import { UserGovNotificationComponent } from './user-gov-notification/user-gov-notification.component';
// import { DatepickerModule } from 'angular2-material-datepicker';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { PagerService } from './service/pager.service';
import { AdminAboutUsComponent } from './admin-about-us/admin-about-us.component';
import { AdminPrivacyPolicyComponent } from './admin-privacy-policy/admin-privacy-policy.component';
import { AdminContactUsComponent } from './admin-contact-us/admin-contact-us.component';
import { AdminInternalUpdatesComponent } from './admin-internal-updates/admin-internal-updates.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
// import { UserAboutUsComponent } from './user-about-us/user-about-us.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { StatePipe } from './admin-state/state.pipe';
import { NotifyPipe } from './admin-gov-notification/notification.pipe';
import { InternalUpdatePipe } from './admin-internal-updates/internal.pipe';
import { hsnCodePipe } from './user-hsn-code/hsnCode.pipe';
import { hsnDescPipe } from './user-hsn-code/hsnDesc.pipe';
import { hsnSerDescPipe } from './user-hsn-code/hsnSerDesc.pipe';
import { hsnSerCodePipe } from './user-hsn-code/hsnSerCode.pipe';
import { PreventLoggedInAccess } from './PreventLoggedInAccess';
import { AuthService } from './auth.service';
import { videosPipe } from './admin-gstone-videos/videos.pipe';
import { GstupdateDetailComponent } from './gstupdate-detail/gstupdate-detail.component';
import { CharOnlyDirective } from './Directives/char-only.directive';
import { NumbersOnlyDirective } from './Directives/numbers-only.directive';
import { AdminInternalUpdateInnerpageComponent } from './admin-internal-update-innerpage/admin-internal-update-innerpage.component';

@NgModule({
  declarations: [
    videosPipe,
    InternalUpdatePipe,
    NotifyPipe,
    StatePipe,
    hsnCodePipe,
    hsnDescPipe,
    hsnSerDescPipe,
    hsnSerCodePipe,
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    UserComponent,
    CustomerComponent,
    ClientComponent,
    VideoslinkComponent,
    GstupdateComponent,
    Gstr1Component,
    EditComponent,
    WorkreturnsComponent,
    GoodservicesComponent,
    AadNewInvoiceComponent,
    VendorComponent,
    EditinvoiceComponent,
    SummaryComponent,
    AddnewinvoiceComponent,
    AddbosComponent,
    ExportinvoiceComponent,
    NewamendmentComponent,
    OtherpageComponent,
    AdminHsnCodeComponent,
    AdminBranchComponent,
    AdminStateComponent,
    AdminDealerTypeComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    AdminFaqsComponent,
    AdminGovNotificationComponent,
    AdminGoodsComponent,
    AdminGstoneVideosComponent,
    UserHsnCodeComponent,
    UserGovNotificationComponent,
    AdminAboutUsComponent,
    AdminPrivacyPolicyComponent,
    AdminContactUsComponent,
    AdminInternalUpdatesComponent,
    AdminHomeComponent,
    HomeDashboardComponent,
    PrivacyPolicyComponent,
    FaqsComponent,
    AboutUsComponent,
    ContactComponent,
    UserDashboardComponent,
    GstupdateDetailComponent,
    CharOnlyDirective,
    NumbersOnlyDirective,
    AdminInternalUpdateInnerpageComponent
    //DatepickerModule
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [ApiserviceService, ExcelServiceService, PagerService, PreventLoggedInAccess, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
