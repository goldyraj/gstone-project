import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as _ from 'underscore';
import { PagerService } from '../service/pager.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-user-gov-notification',
  templateUrl: './user-gov-notification.component.html',
  styleUrls: ['./user-gov-notification.component.css'],
  providers: [ PagerService]
})
export class UserGovNotificationComponent implements OnInit {

  notificationList = [];
  StateVal = {};
  url = "";
  notiRowData;
  rowDataIndex = "";
  access_token;
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  public govNotiForm: FormGroup; // our model driven form
  public editGovNotiForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  constructor(private _fb: FormBuilder, private http: Http,public pagerService:PagerService,private router: Router) {
    this.pager.currentPage = 1;
    // this.access_token = localStorage.getItem("user_token");
    this.getNotificationList(1);
  }

  ngOnInit() {
   
  }

  getNotificationList(page:number) {
    this.pager.currentPage=page;

    console.log('list called');
    this.http.get('http://localhost:3000/api/home/notification?limit=1&page='+this.pager.currentPage).subscribe(data => {
      this.notificationList = data.json().docs;
      this.pager.pageSize = data.json().limit;
      this.pager.totalItems = data.json().total;
      this.setPage();
    });
  }

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.notificationList;
  }

  fetchFile(item_link)
  {
    window.location.href=item_link;
  }
}
