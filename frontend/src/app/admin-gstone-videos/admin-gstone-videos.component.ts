import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PagerService } from '../service/pager.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-admin-gstone-videos',
  templateUrl: './admin-gstone-videos.component.html',
  styleUrls: ['./admin-gstone-videos.component.css'],
  providers:[PagerService]
})
export class AdminGstoneVideosComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;

  videosList = [];
  StateVal={};
  url = "";
  notiRowData;
  rowDataIndex = "";
  pager: any = {};
  apiMessage;
  apiResult=0;
  pagedItems: any[];
  access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";

  public gstVideosForm: FormGroup; // our model driven form
  public editGstVideosForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  constructor(private _fb: FormBuilder, private http: Http,private PagerService:PagerService,public router:Router) {
    this.pager.currentPage = 1;
    this.access_token = localStorage.getItem("admin_token");
    this.getVideosList(this.pager.currentPage);
  }

  ngOnInit() {
    this.gstVideosForm = new FormGroup({
      title: new FormControl('', [<any>Validators.required]),
      description: new FormControl('', [<any>Validators.required]),
      link: new FormControl('', [<any>Validators.required])
    });
    this.editGstVideosForm = new FormGroup({
      title: new FormControl('', [<any>Validators.required]),
      description: new FormControl('', [<any>Validators.required]),
      link: new FormControl('', [<any>Validators.required])
    });

    var context = this;
    if (localStorage.getItem('admin_token')) {
      context.onLoad();
    }
    else {
      context.router.navigate(['/admin-login']);
    }

  }

  onLoad()
  {

  }

  getVideosList(page:number) {
    this.pager.currentPage = page;
    console.log('list called');
    this.http.get('http://localhost:3000/api/vedio/index?token='+this.access_token+'&limit=' + 10 + '&page=' + this.pager.currentPage).subscribe(data => {
      this.videosList = data.json().docs;
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
    this.pagedItems = this.videosList;
  }

  saveGstVideos(isValid: boolean) {
    this.submitted = true; // set form submit to true

    if (isValid == true) {

      // var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "title": this.gstVideosForm.value.title,
        "description": this.gstVideosForm.value.description,
        "link": this.gstVideosForm.value.link
      };
      this.url = "http://localhost:3000/api/vedio/create?token="+this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          this.apiResult=1;
          // alert(response.json().message);
          // this.TotalPages=this.TotalPages+1;
          this.getVideosList(this.pager.currentPage);
        },
        error => {
          this.apiResult=-1;
          this.apiMessage=error.json().message;
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }
  editVideosRecord(data) {
    this.apiMessage;
    this.apiResult=0;
    this.rowDataIndex = data._id;
    var temp;
    if (data) {
      console.log("DATA", data);
      this.editGstVideosForm.get("title").setValue(data.title);
      this.editGstVideosForm.get("description").setValue(data.description);
      this.editGstVideosForm.get("link").setValue(data.link);

    }
    this.notiRowData = data;
  }

  updateVideos(isValid: boolean) {
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
        "title": this.editGstVideosForm.value.title,
        "description": this.editGstVideosForm.value.description,
        "link": this.editGstVideosForm.value.link
      };

      this.url = "http://localhost:3000/api/vedio/update?token="+this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          // alert(response.json().message);
          this.apiResult=1;
          this.getVideosList(this.pager.currentPage);
          this.submittedEdit = false;
        },
        error => {
          this.apiResult=-1;
          this.apiMessage=error.json().message;
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  

  deleteVideosRecord(data) {
    this.rowDataIndex = data._id;
    this.notiRowData = data;
  }

  deleteVideos() {
    console.log("delete api", this.notiRowData._id);


    // var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });

    this.url = "http://localhost:3000/api/vedio/delete/" + this.notiRowData._id+"?token="+this.access_token;
    return this.http.delete(this.url,  requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeDeleteModal();
        this.submittedEdit = false;
        this.getVideosList(this.pager.currentPage);
        // alert(response.json().message);
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
      }
      );
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

  resetForm()
  {
    this.submitted=false;
    this.gstVideosForm.reset();
  }
}
