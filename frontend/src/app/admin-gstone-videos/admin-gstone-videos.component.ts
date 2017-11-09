import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-admin-gstone-videos',
  templateUrl: './admin-gstone-videos.component.html',
  styleUrls: ['./admin-gstone-videos.component.css']
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
  pagedItems: any[];
  access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";

  public gstVideosForm: FormGroup; // our model driven form
  public editGstVideosForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  constructor(private _fb: FormBuilder, private http: Http) {
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
  }

  getVideosList(page:number) {
    this.pager.currentPage = page;
    console.log('list called');
    this.http.get('http://localhost:3000/api/vedio/index?token='+this.access_token+'&limit=' + 5 + '&page=' + this.pager.currentPage + '&sortBy=title&search=').subscribe(data => {
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

    this.pager = this.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.videosList;
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

  // nextPage() {
  //   console.log("paging");
  //   if (this.Paging.page < this.TotalPages) {
  //     this.Paging.page++;
  //     this.getVideosList();
  //   }
  // }

  // previousPage() {
  //   console.log("paging");
  //   if (this.Paging.page > 1) {
  //     this.Paging.page--;
  //     this.getVideosList();
  //   }
  // }


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
          // alert(response.json().message);
          // this.TotalPages=this.TotalPages+1;
          this.getVideosList(this.pager.currentPage);
          this.submitted=false;
          this.gstVideosForm.reset();
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }
  editVideosRecord(data) {
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
          this.getVideosList(this.pager.currentPage);
          this.submittedEdit = false;
        },
        error => {
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
}
