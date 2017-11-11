import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-admin-about-us',
  templateUrl: './admin-about-us.component.html',
  styleUrls: ['./admin-about-us.component.css']
})
export class AdminAboutUsComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;
  aboutUs ="";
  aboutUs_ID ="";
  StateVal = {};
  url = "";
  notiRowData;
  rowDataIndex = "";
  access_token;
  public editAbout: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  pager: any = {};
  pagedItems: any[];
  constructor(private _fb: FormBuilder, private http: Http,public Router:Router) {
    this.access_token = localStorage.getItem("admin_token");
    this.getAboutUsList();
  }

  ngOnInit() {
    this.editAbout = new FormGroup({
      discription: new FormControl('', [<any>Validators.required]),
    });

    var context=this;
    if (localStorage.getItem('admin_token')) {
      
    }
    else {
      context.Router.navigate(['/admin-login']);
    }

  }
  getAboutUsList() {
    console.log('list called');
    this.http.get('http://localhost:3000/api/about/list?token='+this.access_token).subscribe(data => {
      this.aboutUs = data.json().about[0];
      this.aboutUs_ID = data.json().about[0]._id;

      console.log("State  PArse", this.aboutUs);
    });
  }

  editAboutRecord(data) {
    this.rowDataIndex = data._id;
    var temp;
    if (data) {
      console.log("DATA", data);
      this.editAbout.get("discription").setValue(data.discription);
    }
    this.notiRowData = data;
  }

  updateAbout(isValid: boolean) {
    this.submittedEdit = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    this.StateVal = this.editAbout.value;
    console.log("form valuse", this.StateVal, this.notiRowData._id);

    if (isValid == true) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });

      const body = {
        "_id": this.notiRowData._id,
        "discription": this.editAbout.value.discription,
      };
      console.log("body",body);

      this.url = "http://localhost:3000/api/about/update?token="+this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.submittedEdit = false;
          this.getAboutUsList();
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

}
