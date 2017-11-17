import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ApiserviceService } from '../apiservice.service';
import { ExcelServiceService } from '../excel-service.service';
import { RouterModule, Routes, Router } from '@angular/router';
import * as _ from 'underscore';
import { PagerService } from '../service/pager.service';
import { NumberValidatorsService } from "../number-validators.service";

@Component({
  selector: 'app-goodservices',
  templateUrl: './goodservices.component.html',
  styleUrls: ['./goodservices.component.css'],
  providers: [PagerService,ExcelServiceService]
})
export class GoodservicesComponent implements OnInit {

  @ViewChild('closeChoose') closeChoose: ElementRef;
  @ViewChild('closeCsv') closeCsv: ElementRef;

  public addStateForm: FormGroup; // our model driven form
  public isGoodsList: boolean ; // keep track on whether form is submitted
  public isServiceList: boolean ; // keep track on whether form is submitted
  public submitted: boolean = false; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  public ifSuccess: boolean = false;
  goodsData = Array();
  servicesData = Array();
  hsnRowData;
  hsnCodeSubmitData = {};
  modelHide = '';
  public selectedStatusType;
  url = "";
  selectedStatusTypeDrop;
  public hsn_code_status = "0";
  public statusDropDown = Array();
  rowIndexToModify;
  goodsForm: FormGroup;
  goodsFormEdit: FormGroup;
  sortBy = "created_at";
  jsonString;
  access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
  goodsPager: any = {};
  servicesPager: any = {};
  goodsPagedItems: any = [];
  servicesPagedItems: any = [];
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeEditModal') closeEditModal: ElementRef;
  public selectCategory;
  public isDownloadSuccessful;
  isGoodsSelected = true;

  constructor(private http: Http, private pagerService: PagerService, public excelServiceService: ExcelServiceService, private router: Router) {

  }

  ngOnInit() {

    this.goodsForm = new FormGroup({
      hsn_code: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      cgst: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      sgst: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      igst: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      description: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      selectCategory: new FormControl('Select Category'),
      comment: new FormControl()
    });

    this.goodsFormEdit = new FormGroup({
      hsn_code: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      cgst: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      sgst: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      igst: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      description: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      selectCategory: new FormControl('Select Category'),
      comment: new FormControl()
    });

    this.getAllGoods(this.goodsPager.currentPage);
    this.getAllServices(this.goodsPager.currentPage);
  }

  onLoad() {
    this.statusDropDown.push({ "code": 0, "desc": "Approved" });
    this.statusDropDown.push({ "code": 1, "desc": "Pending" });
    this.statusDropDown.push({ "code": 2, "desc": "Declined" });
    this.selectedStatusType = "Select Status";
    console.log("selectedStatusTypeCONSOLE", this.selectedStatusType);
    this.goodsPager.currentPage = 1;
    this.servicesPager.currentPage = 1;
    this.access_token = localStorage.getItem("admin_token");

    this.getAllGoods(this.goodsPager.currentPage);
    this.getAllServices(this.servicesPager.currentPage);

  }

  getAllServices(page: number) {
    this.servicesPager.currentPage = page;
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    // myHeaders.append('x-access-token', this.access_token);
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    // headers.append('Accept','charset=utf-8');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/services/list', options)
      .subscribe(
      response => {
        console.log("BRANCH_LIST_API_RESPONSE", response.json());
        console.log("BRANCH_LIST_API_RESPONSE_2", response.json().services);

        this.servicesData = response.json().services;
        this.servicesPager.pageSize = response.json().limit;
        let isList = this.servicesData.length;
        this.servicesPager.totalItems = response.json().total;
        if (isList === 0) {
          this.isServiceList = true;
          // console.log("")
        } else {
          this.isServiceList = false;
        }

      },
      error => {
        // alert(error.text());
        console.log(error.text());
      }
      );
  }

  getAllGoods(page: number) {
    this.goodsPager.currentPage = page;
    console.log("getALLHSNCODELIST");
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    // myHeaders.append('x-access-token', this.access_token);
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    // headers.append('Accept','charset=utf-8');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/goods/list', options)
      .subscribe(
      response => {
        console.log("BRANCH_LIST_API_RESPONSE", response.json());
        console.log("BRANCH_LIST_API_RESPONSE_2", response.json().docs);
        this.goodsData = response.json().goods;
        let isList = this.goodsData.length;
        this.goodsPager.pageSize = response.json().limit;
        this.goodsPager.totalItems = response.json().total;
        if (isList === 0) {
          this.isGoodsList = true;
          // console.log("")
        } else {
          this.isGoodsList = false;
        }

      },
      error => {
        // alert(error.text());
        console.log(error.text());
      }
      );
  }


}
