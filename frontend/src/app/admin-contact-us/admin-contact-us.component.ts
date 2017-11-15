import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PagerService } from '../service/pager.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-admin-contact-us',
  templateUrl: './admin-contact-us.component.html',
  styleUrls: ['./admin-contact-us.component.css'],
  providers: [PagerService]
})
export class AdminContactUsComponent implements OnInit {


  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;
  notificationList = [];
  StateVal = {};
  url = "";
  notiRowData;
  rowDataIndex = "";
  backupNotificationPager:any={};
  backupNotificationList=[];
  access_token: string;
  public contactUsForm: FormGroup; // our model driven form
  public editcontactUsForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(private _fb: FormBuilder, private http: Http, public PagerService: PagerService, public Router: Router) {
    this.access_token = localStorage.getItem("admin_token");
    this.pager.currentPage = 1;
    this.getNotificationList(this.pager.currentPage);
  }

  ngOnInit() {
    this.contactUsForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      email: new FormControl('', [<any>Validators.required]),
      contact: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      remark: new FormControl('', [<any>Validators.required]),
      company: new FormControl('', [<any>Validators.required]),
    });

    var context = this;
    if (localStorage.getItem('admin_token')) {

    }
    else {
      context.Router.navigate(['/admin-login']);
    }

  }
  getNotificationList(page: number) {
    this.pager.currentPage = page;
    if (page == this.pager.endPage) {
      console.log("ENDPAGE");
      return;
    }
    console.log('list called');
    this.http.get('http://localhost:3000/api/contact/index?token=' + this.access_token + '&limit=' + 5 + '&page=' + this.pager.currentPage + '&sortBy=created_at&search=').subscribe(data => {
      this.notificationList = data.json().docs;
      console.log("CONTACTS_LIST", this.notificationList);
      this.pager.pageSize = data.json().limit;
      this.pager.totalItems = data.json().total;
      this.setPage();
    });
  }

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.PagerService.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.notificationList;
  }

  saveContact(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    this.StateVal = this.contactUsForm.value;
    console.log("form valuse", this.StateVal);

    if (isValid == true) {

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "name": this.contactUsForm.value.name,
        "contact_no": this.contactUsForm.value.contact,
        "email": this.contactUsForm.value.email,
        "company": this.contactUsForm.value.company,
        "remark": this.contactUsForm.value.remark
      };
      this.url = "http://localhost:3000/api/contact/create?token=" + this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  private closeEditModal(): void {
    this.closeBtn2.nativeElement.click();
  }
  private closeDeleteModal(): void {
    this.closeBtn3.nativeElement.click();
  }

  searchKeyword(searchString) {
    console.log("SEARCH_HIT");

    if (searchString) {
      this.http.get('http://localhost:3000/api/contact/index?token=' + this.access_token + '&limit=' + 1000 + "&search=" + searchString).subscribe(data => {
        this.notificationList = data.json().docs;
        this.pager.pageSize = data.json().limit;
        this.pager.totalItems = data.json().total;
        this.backupNotificationList=this.notificationList;
        this.setPage();
        this.backupNotificationPager=this.pager;
      });
    }
    else {
      console.log("SEARCH_EMPTY");
      this.notificationList = this.backupNotificationList;
      this.pager=this.backupNotificationPager;
    }
  }
}
