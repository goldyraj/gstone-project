import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css'],
  providers:[ApiserviceService]
})
export class FaqsComponent implements OnInit {
  faqsList = [];
  notiRowData;
  
  constructor(public http: Http, private router: Router, private _fb: FormBuilder,public apiserviceService: ApiserviceService) {
    this.getFaqsList();
  }

  ngOnInit() {
  }

  getFaqsList() {
    console.log('list called');
    this.http.get(this.apiserviceService.BASE_URL+'faq/index').subscribe(data => {
      this.faqsList = data.json().docs;
      console.log("pagecount", )
      console.log("faqsList", this.faqsList);
    });
  }

  

}
