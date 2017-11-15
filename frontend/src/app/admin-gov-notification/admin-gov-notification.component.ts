import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';
import {PagerService} from '../service/pager.service';
import{ExcelServiceService} from '../excel-service.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-admin-gov-notification',
  templateUrl: './admin-gov-notification.component.html',
  styleUrls: ['./admin-gov-notification.component.css'],
  providers:[ExcelServiceService,PagerService]
})
export class AdminGovNotificationComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;
  notificationList = [];
  StateVal = {};
  url = "";
  notiRowData;
  rowDataIndex = "";
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  
  public govNotiForm: FormGroup; // our model driven form
  public editGovNotiForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";

  constructor(private _fb: FormBuilder, private http: Http,public ExcelServiceService:ExcelServiceService,public PagerService:PagerService,public Router:Router) {
    this.pager.currentPage=1;
    this.access_token = localStorage.getItem("admin_token");
    this.getNotificationList(this.pager.currentPage);
  }

  ngOnInit() {
    this.govNotiForm = new FormGroup({
      title: new FormControl('',[Validators.required,Validators.pattern(".*\\S.*"),Validators.pattern('^[a-zA-Z \-\']+')]),
      description: new FormControl('', [<any>Validators.required]),
      link: new FormControl('',[Validators.required,Validators.pattern(".*\\S.*")])
    });

    this.editGovNotiForm = new FormGroup({
      title: new FormControl('',[Validators.required,Validators.pattern(".*\\S.*"),Validators.pattern('^[a-zA-Z \-\']+')]),
      description: new FormControl('',[Validators.required,Validators.pattern(".*\\S.*")]),
      link: new FormControl('',[Validators.required,Validators.pattern(".*\\S.*")])
    });

    var context=this;
    if (localStorage.getItem('admin_token')) {
      
    }
    else {
      context.Router.navigate(['/admin-login']);
    }

  }

  getNotificationList(page: number) {
    this.pager.currentPage=page;
    console.log('list called');
    this.http.get('http://localhost:3000/api/notification/index?token='+this.access_token+'&limit='+10 + '&page=' + this.pager.currentPage).subscribe(data => {
      this.notificationList = data.json().docs;
      this.pager.pageSize = data.json().limit;
      this.pager.totalItems=data.json().total;
      this.setPage();
    });
  }

  editNotificationRecord(data) {
    this.submittedEdit = false;
    this.rowDataIndex = data._id;
    var temp;
    if (data) {
      console.log("DATA", data);
      this.editGovNotiForm.get("title").setValue(data.title);
      this.editGovNotiForm.get("description").setValue(data.description);
      this.editGovNotiForm.get("link").setValue(data.link);

    }
    this.notiRowData = data;
  }

  updateNotification(isValid: boolean) {
    this.submittedEdit = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");

    if (isValid == true) {

      // var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });

      const body = {
        "_id": this.notiRowData._id,
        "title": this.editGovNotiForm.value.title,
        "description": this.editGovNotiForm.value.description,
        "link": this.editGovNotiForm.value.link
      };

      this.url = "http://localhost:3000/api/notification/update?token="+this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          
          this.getNotificationList(this.pager.currentPage);
          // alert(response.json().message);
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  deleteNotiRecord(data) {
    this.submittedEdit = false;
    this.rowDataIndex = data._id;
    this.notiRowData = data;
  }

  deleteNotification() {
    console.log("delete api", this.notiRowData._id);
    // var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });

    this.url = "http://localhost:3000/api/notification/delete/" + this.notiRowData._id;
    return this.http.delete(this.url, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeDeleteModal();
        this.getNotificationList(this.pager.currentPage);
        // alert(response.json().message);
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
      }
      );
  }

  saveNotification(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    this.StateVal = this.govNotiForm.value;
    console.log("form valuse", this.StateVal);

    if (isValid == true) {

      // var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "title": this.govNotiForm.value.title,
        "description": this.govNotiForm.value.description,
        "link": this.govNotiForm.value.link
      };
      this.url = "http://localhost:3000/api/notification/create?token="+this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          this.getNotificationList(this.pager.currentPage);
          
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

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.PagerService.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.notificationList;
  }

  resetForm()
  {
    this.submitted=false;
    this.submittedEdit=false;
    this.govNotiForm.reset();
  }

}
