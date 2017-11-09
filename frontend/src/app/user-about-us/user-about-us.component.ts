import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-user-about-us',
  templateUrl: './user-about-us.component.html',
  styleUrls: ['./user-about-us.component.css']
})
export class UserAboutUsComponent implements OnInit {

  aboutUs ="";
  constructor(private _fb: FormBuilder, private http: Http) {
    this.getAboutUsList();
  }

  ngOnInit() {
  }
  getAboutUsList() {
    console.log('list called');
    this.http.get('http://localhost:3000/api/about/list?token='+localStorage.getItem("user_token")).subscribe(data => {
      this.aboutUs = data.json().about[0];

      console.log("State  PArse", this.aboutUs);
    });
  }

}
