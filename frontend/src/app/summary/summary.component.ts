import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as _ from 'underscore';
import { PagerService } from '../service/pager.service';
import { ExcelServiceService } from '../excel-service.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { NumberValidatorsService } from "../number-validators.service";
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers:[ApiserviceService]
})
export class SummaryComponent implements OnInit {
page = 1;
public summaryForm: FormGroup;
finyear=[];
currentYear:number;

  // finyear=[
  //   'Financial Year',
  //   '2016-2017',
  //   '2017-2018',
  //   '2018-2019',
  //   '2019-2020',
  //   '2020-2021'
  // ]

  Month=[
    'Month',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Augs',
    'Dept',
    'Oct',
    'Nov',
    'Dec'
  ]

  Invoice=[
    'Invoice Filter',
    'Show All',
    'Show Normal Sales',
    'Show RC Sales',
    'Show E-com Sales',
    'Show Debit Notes',
    'Show Credits Notes'
  ]

  Filter=[
    'Filing Filter',
    'Not Uploaded',
    'Uploaded',
    'Filed'
  ]
  
  constructor(public apiserviceService: ApiserviceService) { }

  ngOnInit() {
    this.summaryForm=new FormGroup({
      finanCialYear: new FormControl('', [<any>Validators.required]),
      finanCialMonth: new FormControl('', [<any>Validators.required]),
      salesForfinanCialYear: new FormControl('', [<any>Validators.required]),
      amount: new FormControl('', [<any>Validators.required]),
      salesFor: new FormControl('', [<any>Validators.required]),
    });
    this.getFinancialYearArray();
  }

  getFinancialYearArray()
  {
    var yearValue;
    this.currentYear=new Date().getFullYear();
    yearValue=this.currentYear;
    this.finyear.push("Financial Year");
    for(var i=0;i<5;i++)
    {
      var yearRange = yearValue+" - "+(yearValue+1);
      this.finyear.push(yearRange);
      yearValue=yearValue+1;
    }
  }

  addSummary()
  {
    
  }

}
