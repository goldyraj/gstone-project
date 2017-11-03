import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Observable,Subject} from "rxjs/Rx";
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { CustomerComponent } from './customer/customer.component';
import { ClientComponent } from './client/client.component';
import { NotificationComponent } from './notification/notification.component';
import { VideoslinkComponent } from './videoslink/videoslink.component';
import { GstupdateComponent } from './gstupdate/gstupdate.component';
import { Gstr1Component } from './gstr-1/gstr-1.component';
import { EditComponent } from './edit/edit.component';
import { WorkreturnsComponent } from './workreturns/workreturns.component';
import { GoodservicesComponent } from './goodservices/goodservices.component';
import { AadNewInvoiceComponent } from './aad-new-invoice/aad-new-invoice.component';
import { VendorComponent } from './vendor/vendor.component';
import { EditinvoiceComponent } from './editinvoice/editinvoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SummaryComponent } from './summary/summary.component';
import { AddnewinvoiceComponent } from './addnewinvoice/addnewinvoice.component';
import { AddbosComponent } from './addbos/addbos.component';
import { ExportinvoiceComponent } from './exportinvoice/exportinvoice.component';
import { NewamendmentComponent } from './newamendment/newamendment.component';
import{AdminBranchComponent} from './admin-branch/admin-branch.component';
import { OtherpageComponent } from './otherpage/otherpage.component';
import { AdminHsnCodeComponent } from './admin-hsn-code/admin-hsn-code.component';
import { AdminDealerTypeComponent } from './admin-dealer-type/admin-dealer-type.component';
import { AdminStateComponent } from './admin-state/admin-state.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {ApiserviceService} from './apiservice.service';
import { AdminFaqsComponent } from './admin-faqs/admin-faqs.component';
import { AdminGovNotificationComponent } from './admin-gov-notification/admin-gov-notification.component'
// import { DatepickerModule } from 'angular2-material-datepicker';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    UserComponent,
    CustomerComponent,
    ClientComponent,
    NotificationComponent,
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
    AdminGovNotificationComponent
    //DatepickerModule
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
