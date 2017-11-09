import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as _ from 'underscore';
import {PagerService} from '../service/pager.service';
import{ExcelServiceService} from '../excel-service.service';

@Component({
  selector: 'app-admin-hsn-code',
  templateUrl: './admin-hsn-code.component.html',
  styleUrls: ['./admin-hsn-code.component.css'],
  // providers:[PagerService]
})
export class AdminHsnCodeComponent implements OnInit {

  public addStateForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submitted_edit: boolean;
  public events: any[] = []; // use later to display form changes
  hsnCodeData = Array();
  hsnRowData;
  hsnCodeSubmitData = {};
  modelHide = '';
  myForm;
  public selectedStatusType;
  url = "";
  selectedStatusTypeDrop;
  myForm_edit;
  public hsn_code_status = "0";
  public statusDropDown = Array();
  rowIndexToModify;
  pager: any = {};
  pagedItems: any[];
  jsonString;
  access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;

  constructor(private http: Http,private pagerService:PagerService,public ExcelServiceService:ExcelServiceService) {
  // constructor(private http: Http) {
    this.statusDropDown.push({ "code": 0, "desc": "Approved" });
    this.statusDropDown.push({ "code": 1, "desc": "Pending" });
    this.statusDropDown.push({ "code": 2, "desc": "Declined" });
    this.selectedStatusType = "Select Status";
    console.log("selectedStatusTypeCONSOLE", this.selectedStatusType);
    this.pager.currentPage = 1;
    this.access_token = localStorage.getItem("admin_token");
    this.getAllHSNCodeList(this.pager.currentPage);
  }

  ngOnInit() {
    // we will initialize our form model here
    this.myForm = new FormGroup({
      hsn_code: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      rate: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      selectedStatusType: new FormControl('Select Status'),
      description: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)])
      // address: new FormGroup({
      //   street: new FormControl('', <any>Validators.required),
      //   postcode: new FormControl('8000')
      // })
    });

    this.myForm_edit = new FormGroup({
      hsn_code_edit: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      rate_edit: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      selectedStatusType_edit: new FormControl('Select Status'),
      description_edit: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)])
    });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  private closeEditModal() {
    this.closeBtn2.nativeElement.click();
  }

  onStatusSelect(data) {
    console.log("LOG_ON_STATUS_SELECT", data);
  }

  getAllHSNCodeList(page: number) {
    this.pager.currentPage = page;
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

    this.http.get('http://localhost:3000/api/hsn/index?token=' + this.access_token + '&limit=' + 10 + '&page=' + this.pager.currentPage + '&sortBy=title&search=', options)
      .subscribe(
      response => {
        console.log("BRANCH_LIST_API_RESPONSE", response.json());
        console.log("BRANCH_LIST_API_RESPONSE_2", response.json().docs);

        this.hsnCodeData = response.json().docs;
        this.pager.pageSize = response.json().limit;
        this.pager.totalItems = response.json().total;
        this.setPage();

      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );
  }

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.hsnCodeData;
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
        var csvString = this.ExcelServiceService.CSV2JSON(csv);
        this.jsonString=csvString;
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

    this.url = "http://localhost:3000/api/hsn/uploadFile?token="+this.access_token;
    return this.http.post(this.url, body, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeModal();
        alert(response.json().message);
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
    this.hsnCodeSubmitData = this.myForm.value;

    console.log("form valuse", this.hsnCodeSubmitData);

    if (isValid == true && this.myForm.value.selectedStatusType != 'Select Status') {

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "code": this.myForm.value.hsn_code,
        "rate": this.myForm.value.rate,
        "description": this.myForm.value.description
      };

      this.url = "http://localhost:3000/api/hsn/create?token="+this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();

          // this.hsnCodeData.push(body);
          // alert(response.json().message);
          this.getAllHSNCodeList(this.pager.currentPage);
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  update(isValid: boolean) {
    console.log("HIIII");
    this.submitted_edit = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");

    
    this.hsnCodeSubmitData = this.myForm_edit.value;
    console.log("form valuse", this.hsnCodeSubmitData);

    if (isValid == true) {
      // if (isValid == true) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token',this.access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      console.log("_ID___", this.hsnRowData._id);
      const body = {
        "code": this.myForm_edit.value.hsn_code_edit,
        "rate": this.myForm_edit.value.rate_edit,
        
        "description": this.myForm_edit.value.description_edit,
        // "statusDesc":this.myForm_edit.value.selectedStatusType_edit,
        "_id": this.hsnRowData._id
      };

      this.url = "http://localhost:3000/api/hsn/update?token="+this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          // console.log("suceessfull data", response);
          this.closeEditModal();
          this.submitted_edit = false;
          // this.hsnCodeData.push(body);
          // this.hsnCodeData.findIndex()
          this.getAllHSNCodeList(this.pager.currentPage);
          // alert(response);
          // this.getAllHSNCodeList();
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  editHSNRecord(data) {
    
    console.log("VALUEATINDEX", this.hsnCodeData.indexOf(data));
    var temp;
    
    this.myForm_edit.get("rate_edit").setValue(data.rate);
    this.myForm_edit.get("hsn_code_edit").setValue(data.code);
    this.myForm_edit.get("description_edit").setValue(data.description);

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

    this.url = "http://localhost:3000/api/hsn/delete/" + this.hsnRowData._id;
    return this.http.delete(this.url, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeModal();

        // this.hsnCodeData.push(body);
        // alert(response.json().message);
        this.getAllHSNCodeList(this.pager.currentPage);
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
      }
      );
  }
}
