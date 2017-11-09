import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-admin-contact-us',
  templateUrl: './admin-contact-us.component.html',
  styleUrls: ['./admin-contact-us.component.css']
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
  
  access_token:string;
  public contactUsForm: FormGroup; // our model driven form
  public editcontactUsForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  // pager object
  pager: any = {};
  
    // paged items
    pagedItems: any[];

  constructor(private _fb: FormBuilder, private http: Http) {
    this.access_token = localStorage.getItem("admin_token");
    this.pager.currentPage=1;
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
   
  }
  getNotificationList(page:number) {
    console.log('list called');
    this.http.get('http://localhost:3000/api/contact/index?token='+this.access_token+'&limit=' + 5 + '&page=' + this.pager.page + '&sortBy=title&search=').subscribe(data => {
      this.notificationList = data.json().docs;
      this.pager.pageSize = data.json().limit;
      this.pager.totalItems=data.json().total;
      this.setPage();
    });
  }

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.notificationList;
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
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
        "contact": this.contactUsForm.value.contact,
        "email": this.contactUsForm.value.email,
        "company": this.contactUsForm.value.company,
        "remark": this.contactUsForm.value.remark
      };
      this.url = "http://localhost:3000/api/contact/create?token="+this.access_token;
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

  // nextPage() {
  //   console.log("paging");
  //   if (this.Paging.page < this.TotalPages) {
  //     this.Paging.page++;
  //     this.getNotificationList();
  //   }
  // }

  // previousPage() {
  //   console.log("paging");
  //   if (this.Paging.page > 1) {
  //     this.Paging.page--;
  //     this.getNotificationList();
  //   }
  // }
  
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  private closeEditModal(): void {
    this.closeBtn2.nativeElement.click();
  }
  private closeDeleteModal(): void {
    this.closeBtn3.nativeElement.click();
  }
}
