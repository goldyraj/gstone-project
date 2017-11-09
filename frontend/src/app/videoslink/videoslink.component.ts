import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-videoslink',
  templateUrl: './videoslink.component.html',
  styleUrls: ['./videoslink.component.css']
})
export class VideoslinkComponent implements OnInit {

  videosList = [];
  StateVal={};
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
  public gstVideosForm: FormGroup; // our model driven form
  public editGstVideosForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  constructor(private _fb: FormBuilder, private http: Http) {
    this.getVideosList();
  }

  ngOnInit() {
  }
  getVideosList() {
    console.log('list called');
    this.http.get('http://localhost:3000/api/vedio/index?limit=' + this.Paging.limit + '&page=' + this.Paging.page + '&sortBy=title&search=').subscribe(data => {
      this.videosList = data.json().docs;
      this.TotalPages = data.json().total;
      this.pageSize = this.Paging.limit;
      this.currentPage = this.Paging.page;
      console.log("pagecount", )
      console.log("State  PArse", this.videosList);
      console.log("TotalPages", this.TotalPages);
    });
  }

}
