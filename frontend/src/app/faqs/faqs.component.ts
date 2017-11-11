import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  faqsList = [];
  notiRowData;
  
  constructor(public http: Http, private router: Router, private _fb: FormBuilder) {
    this.getFaqsList();
  }

  ngOnInit() {
  }

  getFaqsList() {
    console.log('list called');
    this.http.get('http://localhost:3000/api/faq/index').subscribe(data => {
      this.faqsList = data.json().docs;
      console.log("pagecount", )
      console.log("faqsList", this.faqsList);
    });
  }

  

}
