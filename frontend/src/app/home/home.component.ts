import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  // model: any = {};

  notificationList = [];
  internalUpdateList = [];
  videosList = [];
  StateVal = {};
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
  access_token="";
  userDetails =[];
  public userIsLogged :boolean;
  reg = {};
  venderList = [];
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  constructor(public http: Http, private router: Router, private _fb: FormBuilder) {
  
    this.access_token = localStorage.getItem("user_token");
    console.log("user token",this.access_token);
    this.checkAuth();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      contact: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      pan_no: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      email: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      address: new FormControl('', [<any>Validators.required]),
      city: new FormControl('', [<any>Validators.required]),
      userType: new FormControl('', [<any>Validators.required]),
      password: new FormControl('', [<any>Validators.required]),
      confirm_paasword: new FormControl('', [<any>Validators.required]),

    });

  }

  login(username: string, Paasword: string) {
    console.log("Hello Log in Module is ready!!");
    console.log(username, Paasword);
  }


  checkAuth(){
    console.log('auth called');
    this.http.get('http://localhost:3000/api/auth/check?token='+this.access_token).subscribe(data => {
      this.userDetails = data.json().info;
      this.userIsLogged = data.json().success;
      console.log("State  PArse", this.userDetails);
      console.log("userIsLogged", this.userIsLogged);
    },error => {
      console.log("error", error.message);
      this.userIsLogged = error.json().success;
      console.log(error.text());
    });
  }

  logout(){
    console.log("logged out");
    localStorage.clear();
    window.location.reload();
    this.router.navigate(['/home']);
  }
  
}
