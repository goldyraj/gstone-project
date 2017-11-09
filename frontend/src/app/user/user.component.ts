import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import {DatePickerComponent} from 'ng2-bootstrap/datepicker';
// import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
// import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // constructor() { }
  @ViewChild('closeBtn') closeBtn: ElementRef;
  modelHide = '';
  userDetails =[];
  public userIsLogged :boolean;
  url = "";
  cutomer = {};
  access_token="";
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  // private http: Http HttpClient,
  constructor(private _fb: FormBuilder, private http: Http,private router: Router) {
    this.access_token = localStorage.getItem("user_token");
    console.log("user token",this.access_token);
    this.checkAuth();
   } // form builder simplify form initialization

  ngOnInit() {
    
  }

  checkAuth(){
    console.log('auth called');
    this.http.get('http://localhost:3000/api/auth/check?token='+this.access_token).subscribe(data => {
      this.userDetails = data.json().info;
      this.userIsLogged = data.json().success;
      console.log("users", this.userDetails);
      console.log("userIsLogged", this.userIsLogged);
    },error => {
      console.log("error", error.message);
      this.userIsLogged = error.json().success;
      console.log(error.text());
    });
  }

  // userIsLogged(){

  // }

  logout(){
    console.log("logged out");
    localStorage.clear();
    window.location.reload();
    this.router.navigate(['/home']);
  }
}