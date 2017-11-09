import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ExcelServiceService } from '../excel-service.service';
import {PagerService} from '../service/pager.service';
import * as _ from 'underscore'

@Component({
  selector: 'app-user-hsn-code',
  templateUrl: './user-hsn-code.component.html',
  styleUrls: ['./user-hsn-code.component.css'],
  providers:[ExcelServiceService,PagerService]
})
export class UserHsnCodeComponent implements OnInit {

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
  access_token;
  pager: any = {};
  pagedItems: any[];

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3:ElementRef;

  constructor(private http: Http,public pagerService:PagerService,public excelServiceService:ExcelServiceService) {
    this.statusDropDown.push({ "code": 0, "desc": "Approved" });
    this.statusDropDown.push({ "code": 1, "desc": "Pending" });
    this.statusDropDown.push({ "code": 2, "desc": "Declined" });
    this.selectedStatusType = "Select Status";
    console.log("selectedStatusTypeCONSOLE", this.selectedStatusType);
    this.pager.currentPage = 1;
    this.access_token = localStorage.getItem("user_token");
    this.getAllHSNCodeList(1);
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

  getAllHSNCodeList(page:number) {
    console.log("getALLHSNCODELIST");
    this.pager.currentPage=page;
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    // myHeaders.append('x-access-token', access_token);
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    // headers.append('Accept','charset=utf-8');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/hsn/index?token='+this.access_token+'&limit=5&page='+this.pager.currentPage+'&sortBy=title&search=', options)
      .subscribe(
      response => {
        console.log("BRANCH_LIST_API_RESPONSE", response.json());
        console.log("BRANCH_LIST_API_RESPONSE_2", response.json().docs);
        // for (let data of response.json().docs) {
        //   this.hsnCodeData.push(data);
        // }

        this.hsnCodeData=response.json().docs;
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );
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
        // var csvString=this.CSV2JSON(csv);
        this.uploadCsvFileToServer(csvString);
      }
    }
  }

  uploadCsvFileToServer(jsonString) {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });
    const body = {
      "data": JSON.parse(jsonString)
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
    
    var temp = this.statusDropDown.filter(x => x.desc === this.myForm.value.selectedStatusType);
    console.log("CONSOLEEEEE", temp);

    console.log("CONSOLE", temp[0].code);
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
        "status": temp[0].code,
        "description": this.myForm.value.description
      };

      this.url = "http://localhost:3000/api/hsn/create?token="+this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();

          // this.hsnCodeData.push(body);
          alert(response.json().message);
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
  
    var temp = this.statusDropDown.filter(x => x.desc === this.myForm_edit.value.selectedStatusType_edit);
    console.log("CONSOLEEEEE", temp);

    console.log("CONSOLE", temp[0].code);
    this.hsnCodeSubmitData = this.myForm_edit.value;
    console.log("form valuse", this.hsnCodeSubmitData);

    if (isValid == true && temp) {
      // if (isValid == true) {
      
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      console.log("_ID___", this.hsnRowData._id);
      const body = {
        "code": this.myForm_edit.value.hsn_code_edit,
        "rate": this.myForm_edit.value.rate_edit,
        "status": temp[0].code,
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
          alert(response.json().message);
          this.getAllHSNCodeList(this.pager.currentPage);
          // this.getAllHSNCodeList();
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  editHSNRecord(data, indexVal) {
    this.rowIndexToModify = indexVal;
    console.log("indexVal", indexVal);
    console.log("VALUEATINDEX", this.hsnCodeData.indexOf(indexVal));
    console.log("data.selectedStatusType", data.selectedStatusType);
    var temp;
    console
    if (data.status) {
      console.log("GET_STATUS", data.status);
      temp = this.statusDropDown.filter(x => x.code == data.status);
      console.log("selectedStatusTypeDrop", temp[0].desc);
      this.myForm_edit.get("rate_edit").setValue(data.rate);
      this.myForm_edit.get("hsn_code_edit").setValue(data.code);
      this.myForm_edit.get("description_edit").setValue(data.description);

      this.myForm_edit.get("selectedStatusType_edit").setValue(temp[0].desc);
    }

    this.hsnRowData = data;
    // this.selectedStatusTypeDrop=temp[0].desc;
    if (temp[0].desc) {
      this.selectedStatusTypeDrop = temp[0].desc;
    }
    else {
      this.selectedStatusTypeDrop = "Select Status";
    }
  }

  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  }

  recordToBeDeleted(item)
  {
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
        this.closeBtn3.nativeElement.click();
        // this.hsnCodeData.push(body);
        alert(response.json().message);
        this.getAllHSNCodeList(this.pager.currentPage);
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
      }
      );
  }
  

}
