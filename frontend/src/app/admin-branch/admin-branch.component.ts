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
  selector: 'app-admin-branch',
  templateUrl: './admin-branch.component.html',
  styleUrls: ['./admin-branch.component.css'],
  providers:[PagerService]
})
export class AdminBranchComponent implements OnInit {
  pager: any = {};
  searchedStringPager: any = {};
  sortBy = "created_at";
  backupPager:any={};
  // paged items
  pagedItems: any[];
  public myForm: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  access_token = "";
  pagedSearchedItems;
  dataList;
  backupdataList;
  stateDropDownList=[];
  apiMessage;
  apiResult;
  rowData;
  userTypeList=[];
  selectedState:string;
  selectedUserType;

  @ViewChild('closeBtn') closeBtn:ElementRef;
  @ViewChild('closeBtn2') closeBtn2:ElementRef;
  
  constructor(public http: Http, private pagerService: PagerService, private router: Router) {

  }

  ngOnInit() {

    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('.*\\S.*')]),
      contact: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10), Validators.pattern('.*\\S.*')]),
      branch_name: new FormControl('', [Validators.required, Validators.pattern('.*\\S.*')]),
      pan_no: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10),Validators.pattern('.*\\S.*')]),
      email: new FormControl('', [<any>Validators.required,Validators.pattern('.*\\S.*')]),
      gstin: new FormControl('', [<any>Validators.required, Validators.pattern('.*\\S.*')]),
      address: new FormControl('', [<any>Validators.required, Validators.pattern('.*\\S.*')]),
      city: new FormControl('', [<any>Validators.required, Validators.pattern('.*\\S.*')]),
      // userType: new FormControl('', [<any>Validators.required]),
      selectedDealer: new FormControl('Select Dealer',[Validators.required]),
      // password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      // confirm_paasword: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      state: new FormControl('', [<any>Validators.required]),

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
    this.access_token=localStorage.getItem('admin_token');
    this.pager.currentPage=1;
    this.getDataList(1);
    this.prepareStateDropdown();
    this.prepareUserType();
  }

  prepareUserType()
  {
    this.userTypeList.push('Admin');
    this.userTypeList.push('User Agent');
  }

  getDataList(page:number) {

    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/branch/index?token=' + this.access_token + '&limit=' + 50 + '&page=' + page + "&sortBy=" + this.sortBy, options)
      .subscribe(
      response => {
        this.dataList = response.json().docs;
        this.pager.pageSize = response.json().limit;
        this.pager.totalItems = response.json().total;
        this.backupdataList = this.dataList;
        this.setPage();
        this.backupPager = this.pager;
      },
      error => {
        console.log(error.text());
      }
      );
  }

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    this.pagedItems = this.dataList;
  }

  prepareStateDropdown()
  {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/state/list', options)
      .subscribe(
      response => {
        this.stateDropDownList = response.json().state;
        console.log("state",this.stateDropDownList);
      },
      error => {
        console.log(error.text());
      }
      );
  }

  editRecords(data)
  {
    console.log("DATA",data);
    this.apiMessage="";
    this.apiResult=0;
    this.submitted = false;
  
    if (data) {
      this.myForm.get("name").setValue(data.name);
      this.myForm.get("contact").setValue(data.contact);
      this.myForm.get("pan_no").setValue(data.pan_no);
      this.myForm.get("email").setValue(data.email);
      this.myForm.get("gstin").setValue(data.gstin);
      this.myForm.get("address").setValue(data.address);
      this.myForm.get("city").setValue(data.city);
      this.myForm.get("branch_name").setValue(data.branch_name);
      // this.myForm.get("state").setValue(data.state);
    }
    this.selectedState=data.state;
    this.selectedState=this.selectedState.trim();
    this.selectedUserType=data.userType;
    this.rowData = data;
  }

  update(isValid: boolean) {
    console.log("FORM",isValid);

    this.submitted = true; // set form submit to true

    if (isValid == true) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({ headers: headers });
      console.log("ID", this.rowData._id);
      const body = {
        "_id": this.rowData._id,
        "name": this.myForm.value.name,
        "contact": this.myForm.value.contact,
        "pan_no": this.myForm.value.pan_no,
        "email": this.myForm.value.email,
        "gstin": this.myForm.value.gstin,
        "address": this.myForm.value.address,
        "city": this.myForm.value.city,
        "state": this.myForm.value.state,
        "branch_name":this.myForm.value.branch_name
      };

      var url = "http://localhost:3000/api/branch/update?token=" + this.access_token;
      return this.http.put(url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.getDataList(this.pager.currentPage);
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  private closeEditModal(): void {
    this.closeBtn.nativeElement.click();
  }

  deleteRecord() {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({ headers: headers });

    var url = "http://localhost:3000/api/branch/delete/" + this.rowData._id;
    return this.http.delete(url, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeBtn2.nativeElement.click();
        this.getDataList(this.pager.currentPage);
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
      }
      );
  }

  recordToDelete(item) {
    this.rowData = item;
  }

  resetForm() {
    this.myForm.reset();
    this.myForm.get("state").setValue("");
    this.submitted = false;
  }

  searchKeyword(searchString) {

    if (searchString) {
      this.http.get('http://localhost:3000/api/branch/index?token=' + this.access_token + '&limit=' + 1000 + "&search=" + searchString).subscribe(data => {
        this.dataList = data.json().docs;
        this.pager.pageSize = data.json().limit;
        this.pager.totalItems = data.json().total;
        this.setPage();
      });
    }
    else {
      console.log("SEARCH_EMPTY");
      this.dataList = this.backupdataList;
      this.pager=this.backupPager;
    }
  }

}
