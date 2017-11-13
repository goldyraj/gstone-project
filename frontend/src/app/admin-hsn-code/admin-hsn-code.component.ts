import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as _ from 'underscore';
import { PagerService } from '../service/pager.service';
import { ExcelServiceService } from '../excel-service.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { NumberValidatorsService } from "../number-validators.service";

@Component({
  selector: 'app-admin-hsn-code',
  templateUrl: './admin-hsn-code.component.html',
  styleUrls: ['./admin-hsn-code.component.css'],
  providers: [PagerService, ExcelServiceService,NumberValidatorsService]
})
export class AdminHsnCodeComponent implements OnInit {

  public addStateForm: FormGroup; // our model driven form
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
  @ViewChild('closeChoose') closeChoose: ElementRef;
  @ViewChild('closeCsv') closeCsv: ElementRef;
  public selectCategory;
  public isDownloadSuccessful;
  isGoodsSelected = true;

  constructor(private http: Http, private pagerService: PagerService, public excelServiceService: ExcelServiceService, private router: Router) {

  }

  ngOnInit() {

    this.goodsForm = new FormGroup({
      hsn_code: new FormControl(0, [Validators.required,, NumberValidatorsService.min(0)]),
      cgst: new FormControl(0,[Validators.required,, NumberValidatorsService.min(0)]),
      sgst: new FormControl(0,[Validators.required,, NumberValidatorsService.min(0)]),
      igst: new FormControl(0,[Validators.required,, NumberValidatorsService.min(0)]),
      description: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      selectCategory: new FormControl('Select Category'),
      comment: new FormControl()
    });

    this.goodsFormEdit = new FormGroup({
      hsn_code: new FormControl(0, [Validators.required,, NumberValidatorsService.min(0)]),
      cgst: new FormControl(0,[Validators.required,, NumberValidatorsService.min(0)]),
      sgst: new FormControl(0,[Validators.required,, NumberValidatorsService.min(0)]),
      igst: new FormControl(0,[Validators.required,, NumberValidatorsService.min(0)]),
      description: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      selectCategory: new FormControl('Select Category'),
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
      this.url = "http://localhost:3000/api/goods/uploadFile?token=" + this.access_token;
    }
    else {
      this.url = "http://localhost:3000/api/services/uploadFile?token=" + this.access_token;
    }

    return this.http.post(this.url, body, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeModal();
        this.closeCsv.nativeElement.click();
        this.closeChoose.nativeElement.click();
        this.ifSuccess = true;
        if (this.isGoodsSelected) {
          this.getAllGoods(this.goodsPager.currentPage);
        }
        else {
          this.getAllServices(this.servicesPager.currentPage);
        }
        // alert(response.json().message);
      },
      error => {
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
        this.url = "http://localhost:3000/api/goods/create?token=" + this.access_token;
      }
      else {
        this.url = "http://localhost:3000/api/services/create?token=" + this.access_token;
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
        this.url = "http://localhost:3000/api/goods/update?token=" + this.access_token;
      }
      else {
        this.url = "http://localhost:3000/api/services/update?token=" + this.access_token;
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
      this.url = "http://localhost:3000/api/goods/delete/" + this.hsnRowData._id ;
    }
    else {
      this.url = "http://localhost:3000/api/services/delete/" + this.hsnRowData._id ;
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

    this.http.get('http://localhost:3000/api/services/index?token=' + this.access_token + '&limit=' + 10 + '&page=' + page + '&search=' + "&sortBy=" + this.sortBy, options)
      .subscribe(
      response => {
        console.log("BRANCH_LIST_API_RESPONSE", response.json());
        console.log("BRANCH_LIST_API_RESPONSE_2", response.json().docs);

        this.servicesData = response.json().docs;
        this.servicesPager.pageSize = response.json().limit;
        this.servicesPager.totalItems = response.json().total;
        this.setServicesPagination();

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

    this.http.get('http://localhost:3000/api/goods/index?token=' + this.access_token + '&limit=' + 10 + '&page=' + page, options)
      .subscribe(
      response => {
        console.log("BRANCH_LIST_API_RESPONSE", response.json());
        console.log("BRANCH_LIST_API_RESPONSE_2", response.json().docs);

        this.goodsData = response.json().docs;
        this.goodsPager.pageSize = response.json().limit;
        this.goodsPager.totalItems = response.json().total;
        this.setGoodsPagination();

      },
      error => {
        // alert(error.text());
        console.log(error.text());
      }
      );
  }

  getList(isGoods: boolean) {
    this.isGoodsSelected = isGoods;
    if (isGoods) {
      this.getAllGoods(this.goodsPager.currentPage);
    }
    else {
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
      this.url = 'http://localhost:3000/api/services/index?token=' + this.access_token;
    }
    else {
      this.url = 'http://localhost:3000/api/goods/index?token=' + this.access_token;
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
}
