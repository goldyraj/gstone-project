import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  policyList = [];
  constructor(public http: Http, private router: Router, private _fb: FormBuilder) {
    this.getPolicyList();
  }

  ngOnInit() {
  }
  getPolicyList() {
    console.log('list called');
    this.http.get('http://localhost:3000/api/privacy/list').subscribe(data => {
      this.policyList = data.json().privacy[0];
      console.log("pagecount", )
      console.log("policy", this.policyList);
    });
  }
}
