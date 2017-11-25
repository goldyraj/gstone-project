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
  selector: 'app-admin-hsn-code',
  templateUrl: './admin-hsn-code.component.html',
  styleUrls: ['./admin-hsn-code.component.css'],
  providers: [PagerService, ExcelServiceService,NumberValidatorsService,ApiserviceService]
})
export class AdminHsnCodeComponent implements OnInit {

  public codeSerValue:string;
  public addStateForm: FormGroup; // our model driven form
  public submitted: boolean = false; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public  backupGoodsDataList=Array();
  public  backupServicesDataList=Array();
  public ifSuccess: number = 0;
  public  goodsData = Array();
  public  servicesData = Array();
  public  hsnRowData;
  public  hsnCodeSubmitData = {};
  public  goodsKeyWord:string;
  public  searchDescString:string;
  public selectedStatusType:string;
  public  url:string = "";
  public  backupGoodsPager:any={};
  public  backupServicesPager:any={};
  public selectedStatusTypeDrop:string;
  public hsn_code_status:string = "0";
  public statusDropDown = Array();
  public rowIndexToModify:number;
  public goodsForm: FormGroup;
  public goodsFormEdit: FormGroup;
  // sortBy = "created_at";
  public  sortBy:string = "hsn_code";
  public  jsonString:string;
  public  access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
  public  goodsPager: any = {};
  public servicesPager: any = {};
  public goodsPagedItems: any = [];
 public servicesPagedItems: any = [];
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeEditModal') closeEditModal: ElementRef;
  @ViewChild('closeChoose') closeChoose: ElementRef;
  @ViewChild('closeCsv') closeCsv: ElementRef;
  @ViewChild('clearInputFile') clearInputFile:ElementRef;
  public selectCategory:string;
  public isDownloadSuccessful:boolean;
  public isGoodsSelected:boolean = true;
  public searchString:string;
  public codeValue:number;

  constructor(private http: Http, private pagerService: PagerService, public excelServiceService: ExcelServiceService, private router: Router,public ApiserviceService:ApiserviceService) {
    this.goodsPager.pageSize=0;
    this.goodsPager.totalItems=0;
    this.goodsPager.currentPage=0;
  }

  ngOnInit() {

    this.goodsForm = new FormGroup({
      hsn_code: new FormControl(0, [Validators.required,, NumberValidatorsService.min(0)]),
      cgst: new FormControl(0,[Validators.required,, NumberValidatorsService.min(0)]),
      sgst: new FormControl(0,[Validators.required,, NumberValidatorsService.min(0)]),
      igst: new FormControl(0,[Validators.required,, NumberValidatorsService.min(0)]),
      description: new FormControl('',[Validators.required,Validators.pattern(".*\\S.*")]),
      selectCategory: new FormControl(''),
      comment: new FormControl()
    });

    this.goodsFormEdit = new FormGroup({
      hsn_code: new FormControl(0, [Validators.required,, NumberValidatorsService.min(0)]),
      cgst: new FormControl(0,[Validators.required,, NumberValidatorsService.min(0)]),
      sgst: new FormControl(0,[Validators.required,, NumberValidatorsService.min(0)]),
      igst: new FormControl(0,[Validators.required,, NumberValidatorsService.min(0)]),
      description: new FormControl('',[Validators.required,Validators.pattern(".*\\S.*")]),
      selectCategory: new FormControl(''),
      comment: new FormControl()
    });

    var context = this;
    if (localStorage.getItem('admin_token')) {
      context.onLoad();
    }
    else {
      context.router.navigate(['/admin-login']);
    }
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

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  private closeEditModl() {
    this.closeEditModal.nativeElement.click();
  }

  onStatusSelect(data) {
    console.log("LOG_ON_STATUS_SELECT", data);
  }

  onCSVFilePicked(files: FileList) {
    
    console.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      console.log(file.name);
      console.log(file.size);
      console.log(file.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result;
        console.log(csv);
        var csvString = this.excelServiceService.CSV2JSON(csv);
        this.jsonString = csvString;
        // var csvString=this.CSV2JSON(csv);
        // this.uploadCsvFileToServer(csvString);
      }
    }
  }

  uploadCsvFileToServer() {

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', this.access_token);
    const requestOptions = new RequestOptions({ headers: headers });
    const body = {
      "data": JSON.parse(this.jsonString)
    };

    console.log("CSV_DATA", body);

    if (this.isGoodsSelected) {
      this.url = this.ApiserviceService.BASE_URL+"goods/uploadFile?token=" + this.access_token;
    }
    else {
      this.url = this.ApiserviceService.BASE_URL+"services/uploadFile?token=" + this.access_token;
    }

    return this.http.post(this.url, body, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        // this.closeModal();
        // this.closeCsv.nativeElement.click();
        // this.closeChoose.nativeElement.click();
        this.ifSuccess = 1;
        this.clearInputFile.nativeElement.value="";
        if (this.isGoodsSelected) {
          this.getAllGoods(this.goodsPager.currentPage);
        }
        else {
          this.getAllServices(this.servicesPager.currentPage);
        }
        
        // alert(response.json().message);
      },
      error => {
        this.ifSuccess = -1;
        console.log("error", error.message);
        console.log(error.text());
      }
      );
  }

  save(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    this.hsnCodeSubmitData = this.goodsForm.value;

    console.log("form valuse", this.hsnCodeSubmitData);

    if (isValid == true) {

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "hsn_code": this.goodsForm.value.hsn_code,
        "cgst": this.goodsForm.value.cgst,
        "sgst": this.goodsForm.value.sgst,
        "igst": this.goodsForm.value.igst,
        "description": this.goodsForm.value.description,
        "condition": this.goodsForm.value.condition
      };

      if (this.isGoodsSelected) {
        this.url = this.ApiserviceService.BASE_URL+"goods/create?token=" + this.access_token;
      }
      else {
        this.url = this.ApiserviceService.BASE_URL+"services/create?token=" + this.access_token;
      }

      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          
          // this.hsnCodeData.push(body);
          // alert(response.json().message);
          // this.goodsForm.reset();
          if (this.isGoodsSelected) {
            this.getAllGoods(this.goodsPager.currentPage);
          }
          else {
            this.getAllServices(this.servicesPager.currentPage);
          }


        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  update(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);

    if (isValid == true) {
      this.submitted=false;
      // if (isValid == true) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', this.access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      console.log("_ID___", this.hsnRowData._id);
      const body = {
        "hsn_code": this.goodsFormEdit.value.hsn_code,
        "cgst": this.goodsFormEdit.value.cgst,
        "sgst": this.goodsFormEdit.value.sgst,
        "igst": this.goodsFormEdit.value.igst,
        "description": this.goodsFormEdit.value.description,
        "condition": this.goodsFormEdit.value.condition,
        "_id": this.hsnRowData._id
      };


      if (this.isGoodsSelected) {
        this.url = this.ApiserviceService.BASE_URL+"goods/update?token=" + this.access_token;
      }
      else {
        this.url = this.ApiserviceService.BASE_URL+"services/update?token=" + this.access_token;
      }


      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          this.closeEditModl();
          
          if (this.isGoodsSelected) {
            this.getAllGoods(this.goodsPager.currentPage);
          }
          else {
            this.getAllServices(this.servicesPager.currentPage);
          }
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  editHSNRecord(data) {

    var temp;
    // this.submitted=false;
    this.goodsFormEdit.get("sgst").setValue(data.sgst);
    this.goodsFormEdit.get("igst").setValue(data.igst);
    this.goodsFormEdit.get("cgst").setValue(data.cgst);
    this.goodsFormEdit.get("description").setValue(data.description);
    this.goodsFormEdit.get("hsn_code").setValue(data.hsn_code);
    if(this.isGoodsSelected)
    {
      this.goodsFormEdit.get("selectCategory").setValue("Goods");
    }
    else
    {
      this.goodsFormEdit.get("selectCategory").setValue("Services");
    }
    
    this.selectCategory=data.selectCategory;
    this.hsnRowData = data;
  }

  recordToBeDeleted(item) {
    this.hsnRowData = item;
  }

  deleteHSNRecord() {

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({ headers: headers });
    console.log("_ID___", this.hsnRowData._id);

    if (this.isGoodsSelected) {
      this.url = this.ApiserviceService.BASE_URL+"goods/delete/" + this.hsnRowData._id ;
    }
    else {
      this.url = this.ApiserviceService.BASE_URL+"services/delete/" + this.hsnRowData._id ;
    }

    return this.http.delete(this.url, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeModal();
        if (this.isGoodsSelected) {
          this.getAllGoods(this.goodsPager.currentPage);
        }
        else {
          this.getAllServices(this.servicesPager.currentPage);
        }
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
      }
      );
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

    this.http.get(this.ApiserviceService.BASE_URL+'services/index?token=' + this.access_token + '&limit=' + 10 + '&page=' + page + '&search=' + "&sortBy=" + this.sortBy, options)
      .subscribe(
      response => {
        console.log("BRANCH_LIST_API_RESPONSE", response.json());
        console.log("BRANCH_LIST_API_RESPONSE_2", response.json().docs);

        this.servicesData = response.json().docs;
        this.servicesPager.pageSize = response.json().limit;
        this.servicesPager.totalItems = response.json().total;
        this.backupServicesDataList=this.servicesData;
        this.setServicesPagination();
        this.backupServicesPager=this.servicesPager;
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

    this.http.get(this.ApiserviceService.BASE_URL+'goods/index?token=' + this.access_token + '&limit=' + 10 + '&page=' + page+"&sortBy="+this.sortBy, options)
      .subscribe(
      response => {
        console.log("BRANCH_LIST_API_RESPONSE", response.json());
        console.log("BRANCH_LIST_API_RESPONSE_2", response.json().docs);

        this.goodsData = response.json().docs;
        this.goodsPager.pageSize = response.json().limit;
        this.goodsPager.totalItems = response.json().total;
        this.backupGoodsDataList = this.goodsData;
        this.setGoodsPagination();
        this.backupGoodsPager = this.goodsPager;
      },
      error => {
        // alert(error.text());
        console.log(error.text());
      }
      );
  }

  getList(isGoods: boolean) {
    this.isGoodsSelected = isGoods;
    if (isGoods && this.backupGoodsDataList==null) {
      this.getAllGoods(this.goodsPager.currentPage);
    }
    else if(isGoods && this.backupGoodsDataList)
    {
      this.searchGoodsKeyword(this.goodsKeyWord);
    }
    else if(!isGoods && this.backupServicesDataList)
    {
      this.searchServicesKeyword(this.searchDescString);
    }
    else{
      this.getAllServices(this.servicesPager.currentPage);
    }
  }

  setGoodsPagination() {
    if (this.goodsPager.currentPage < 1 || this.goodsPager.currentPage > this.goodsPager.TotalPages) {
      return;
    }

    this.goodsPager = this.pagerService.getPager(this.goodsPager.totalItems, this.goodsPager.currentPage, this.goodsPager.pageSize);
    console.log("pager", this.goodsPager);
    // this.getStateList();
    this.goodsPagedItems = this.goodsData;
  }

  setServicesPagination() {
    if (this.servicesPager.currentPage < 1 || this.servicesPager.currentPage > this.servicesPager.TotalPages) {
      return;
    }

    this.servicesPager = this.pagerService.getPager(this.servicesPager.totalItems, this.servicesPager.currentPage, this.servicesPager.pageSize);
    console.log("pager", this.servicesPager);
    // this.getStateList();
    this.servicesPagedItems = this.servicesData;
  }

  downloadJSONTOCSV() {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    var exportedList;
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');

    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    if (this.isGoodsSelected) {
      this.url = this.ApiserviceService.BASE_URL+'services/index?token=' + this.access_token;
    }
    else {
      this.url = this.ApiserviceService.BASE_URL+'goods/index?token=' + this.access_token;
    }

    this.http.get(this.url, options)
      .subscribe(
      response => {
        exportedList = response.json().docs;
        this.excelServiceService.exportAsExcelFile(exportedList, "JSONTOCSV1");
        this.isDownloadSuccessful=true;
      },
      error => {
        // alert(error.text());
        console.log(error.text());
      }
      );

    
  }

  closeDownloadModal()
  {
    this.isDownloadSuccessful=false;
  }

  resetForm()
  {
    this.submitted = false;
    this.goodsForm.reset();
    this.goodsForm.get("selectCategory").setValue("Select Category");
  }

  resteCSVForm()
  {
    this.clearInputFile.nativeElement.value="";
    this.ifSuccess=0;
  }

  searchGoodsKeyword(searchString) {
    this.searchString=searchString;
    console.log("SEARCH_HIT");
    this.goodsKeyWord=searchString;

    if (searchString) {
      this.http.get(this.ApiserviceService.BASE_URL+'goods/index?token=' + this.access_token + '&limit=' + 1000 + "&search=" + searchString).subscribe(data => {
        this.goodsData = data.json().docs;
        this.goodsPager.pageSize = data.json().limit;
        this.goodsPager.totalItems = data.json().total;
        this.setGoodsPagination();
        console.log("State  PArse", this.goodsData);
      });
    }
    else {
      console.log("SEARCH_EMPTY");
      this.goodsData = this.backupGoodsDataList;
      this.goodsPager=this.backupGoodsPager;
    }
  }

  searchServicesKeyword(searchDescString) {
    console.log("SEARCH_HIT");
    this.searchDescString=searchDescString;
    if (searchDescString) {
      this.http.get(this.ApiserviceService.BASE_URL+'services/index?token=' + this.access_token + '&limit=' + 1000 + "&search=" + this.searchString).subscribe(data => {
        this.servicesData = data.json().docs;
        this.servicesPager.pageSize = data.json().limit;
        this.servicesPager.totalItems = data.json().total;
        this.setServicesPagination();
        console.log("State  PArse", this.goodsData);
      });
    }
    else {
      console.log("SEARCH_EMPTY");
      this.servicesData = this.backupServicesDataList;
      this.servicesPager=this.backupGoodsPager;
    }
  }
}
