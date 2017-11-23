import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { PagerService } from '../service/pager.service';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-gstupdate',
  templateUrl: './gstupdate.component.html',
  styleUrls: ['./gstupdate.component.css'],
  providers:[ApiserviceService]
})
export class GstupdateComponent implements OnInit {


  internalUpdateList = [];
  url = "";
  notiRowData;
  rowDataIndex = "";
  Paging = {
    page: 1,
    limit: 2
  };
  TotalPages: number;
  pageSize: number;
  currentPage: number;
  loading = false;
  modelHide = '';
  pagedItems: any[];
  pager: any = {};
  reg = {};
  venderList = [];
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  access_token;

  constructor(public http: Http, private router: Router, private _fb: FormBuilder, public pagerService: PagerService,public apiserviceService: ApiserviceService) {
    this.access_token = localStorage.getItem("user_token");
    console.log("user_token", this.access_token);
    this.getInternalUpdateList(1);
  }

  ngOnInit() {
  }



  getInternalUpdateList(page: number) {
    console.log('list called');
    this.http.get(this.apiserviceService.BASE_URL+'home/internal?limit=2&page=' + this.pager.currentPage).subscribe(data => {
      this.internalUpdateList = data.json().docs;
      this.TotalPages = data.json().total;
      this.pageSize = this.Paging.limit;
      this.currentPage = this.Paging.page;
      console.log("pagecount", )
      console.log("State  PArse", this.internalUpdateList);
      console.log("TotalPages", this.TotalPages);
      console.log("TotalPages", this.pageSize);
    });
  }

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.internalUpdateList;
  }

}
