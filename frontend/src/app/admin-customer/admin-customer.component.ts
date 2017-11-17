import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PagerService } from '../service/pager.service';
import * as _ from 'underscore';
import { RouterModule, Routes, Router } from '@angular/router';
import { PreventLoggedInAccess } from '../PreventLoggedInAccess';
import { NumberValidatorsService } from "../number-validators.service";
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css']
})
export class AdminCustomerComponent implements OnInit {

  // pager object
  pager: any = {};
  searchedStringPager: any = {};
  sortBy = "created_at";
  backupPager:any={};
  // paged items
  pagedItems: any[];
  public myForm: FormGroup; // our model driven form
  public myFormEdit: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public stateRowData;
  access_token = "";
  pagedSearchedItems;
  dataList;
  backupdataList;

  constructor(private http: Http, private pagerService: PagerService, private router: Router) {

  }

  ngOnInit() {

    var context = this;
    if (localStorage.getItem('admin_token')) {
      context.onLoad();
    }
    else {
      context.router.navigate(['/admin-login']);
    }

  }

  onLoad() {
    this.pager.currentPage = 1;
    this.getDataList(1);
  }

  getDataList(page: number) {
    console.log("getALLHSNCODELIST");
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    // myHeaders.append('x-access-token', this.access_token);
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    // headers.append('Accept','charset=utf-8');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/customer/index?token=' + this.access_token + '&limit=' + 10 + '&page=' + page + "&sortBy=" + this.sortBy, options)
      .subscribe(
      response => {
        console.log("BRANCH_LIST_API_RESPONSE", response.json());
        console.log("BRANCH_LIST_API_RESPONSE_2", response.json().docs);

        this.dataList = response.json().docs;
        this.pager.pageSize = response.json().limit;
        this.pager.totalItems = response.json().total;
        this.backupdataList = this.dataList;
        this.setPage();
        this.backupPager = this.pager;
      },
      error => {
        // alert(error.text());
        console.log(error.text());
      }
      );
  }

  setPage() {

  }

}
