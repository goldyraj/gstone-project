import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PagerService } from '../service/pager.service';
import * as _ from 'underscore';
import { RouterModule, Routes, Router } from '@angular/router';
import { PreventLoggedInAccess } from '../PreventLoggedInAccess';
import { NumberValidatorsService } from "../number-validators.service";
import { NgZone } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-admin-state',
  templateUrl: './admin-state.component.html',
  styleUrls: ['./admin-state.component.css'],
  providers: [PagerService, PreventLoggedInAccess, NumberValidatorsService,ApiserviceService]
})
export class AdminStateComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;

  backupStateList;
  modelHide = '';
  url = "";
  StateVal = {};
  stateList = [];
  country;
  person = {
    name: 'ox',
    country: { id: 0, name: 'Select Status' }
  }

  // pager object
  pager: any = {};
  savePagerStatus: any = {};
  searchedStringPager: any = {};
  sortBy = "created_at";

  // paged items
  pagedItems: any[];

  countries = [
    { id: 0, name: 'Select Status' },
    { id: 1, name: 'c1' },
    { id: 2, name: 'c2' },
    { id: 3, name: 'c3' },
    { id: 4, name: 'c4' }
  ]

  // TotalPages: number;
  // pageSize: number;
  // currentPage: number;

  public myForm: FormGroup; // our model driven form
  public myFormEdit: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public stateRowData;
  access_token = "";
  pagedSearchedItems;

  constructor(private _fb: FormBuilder, private http: Http, private pagerService: PagerService, public router: Router, private zone: NgZone,public ApiserviceService:ApiserviceService) {
    // this.currentPage=1;
  }

  onLoad() {

    this.access_token = localStorage.getItem("admin_token");
    console.log("admin token", this.access_token);
    this.pager.currentPage = 1;
    // this.setPage(this.pager.currentPage);
    this.getStateList(this.pager.currentPage);
    console.log("cusntor call");

  }

  ngOnInit() {
    // we will initialize our form model here
    this.person.country = this.countries.filter(c => c.id === this.person.country.id)[0];
    this.myForm = new FormGroup({
      // statename: new FormControl('', [Validators.pattern('[A-Za-z]{3}')]),
      statename: new FormControl('', [Validators.required, Validators.pattern(".*\\S.*"), Validators.pattern('^[a-zA-Z \-\']+')]),
      statecode: new FormControl(0, [Validators.required, , NumberValidatorsService.min(0)]),
      country: new FormControl('Select Status', [])
    });

    this.myFormEdit = new FormGroup({
      statename: new FormControl('', [Validators.required, Validators.pattern(".*\\S.*"), Validators.pattern('^[a-zA-Z \-\']+')]),
      statecode: new FormControl(0, [Validators.required, , NumberValidatorsService.min(0)]),
      country: new FormControl('Select Status', [])
    });

    var context = this;
    if (localStorage.getItem('admin_token') != null) {
      context.onLoad();
    }
    else {
      context.router.navigate(['/admin-login']);
    }
  }


  saveState(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    console.log("form val", this.myForm.value.name);
    this.StateVal = this.myForm.value;
    console.log("form valuse", this.StateVal);

    if (isValid == true) {

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "name": this.myForm.value.statename,
        "code": this.myForm.value.statecode
      };
      this.stateList.push(body);
      this.url = this.ApiserviceService.BASE_URL+"state/create?token=" + this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          // alert(response.json().message);
          this.getStateList(this.pager.currentPage);

        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
          alert(error.text());
        }
        );
    }
  }

  getStateList(page: number) {
    this.pager.currentPage = page;
    this.http.get(this.ApiserviceService.BASE_URL+'state/index?token=' + this.access_token + '&limit=' + 10 + '&page=' + this.pager.currentPage).subscribe(data => {
      this.stateList = data.json().docs;
      // this.pager.TotalPages = data.json().total;
      this.pager.pageSize = data.json().limit;
      this.pager.totalItems = data.json().total;
      this.backupStateList = this.stateList;
      this.setPage();
      this.savePagerStatus = this.pager;
      console.log("DATA_API", this.stateList);
    });
  }

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);

    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.stateList;
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  private closeEditModal(): void {
    this.closeBtn2.nativeElement.click();
  }

  private closeDeleteModal() {
    this.closeBtn3.nativeElement.click();
  }

  editStateRecords(data) {
    var temp;
    this.submitted = false;
    if (data) {
      console.log("DATA", data);

      this.myFormEdit.get("statename").setValue(data.name);
      this.myFormEdit.get("statecode").setValue(data.code);
      this.myFormEdit.get("country").setValue(data.country);
    }
    this.country = data.country;
    this.stateRowData = data;
  }

  updateState(isValid: boolean) {
    this.submitted = true; // set form submit to true

    if (isValid == true) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({ headers: headers });
      console.log("ID", this.stateRowData._id);
      const body = {
        "_id": this.stateRowData._id,
        "name": this.myFormEdit.value.statename,
        "code": this.myFormEdit.value.statecode
      };

      this.url = this.ApiserviceService.BASE_URL+"state/update?token=" + this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.getStateList(this.pager.currentPage);

        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  deleteRecord() {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({ headers: headers });
    console.log("_ID___", this.stateRowData._id);

    this.url = this.ApiserviceService.BASE_URL+"state/delete/" + this.stateRowData._id;
    return this.http.delete(this.url, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeDeleteModal();
        this.getStateList(this.pager.currentPage);
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
      }
      );
  }

  recordToDelete(item) {
    this.stateRowData = item;
  }

  resetForm() {
    this.myForm.reset();
    this.myForm.get("country").setValue("Select Status");
    this.submitted = false;
  }

  searchKeyword(searchString) {
    console.log("SEARCH_HIT");
    console.log("REAL_LIST", this.stateList);
    console.log("BACKUP_LIST", this.backupStateList);

    if (searchString) {
      this.http.get(this.ApiserviceService.BASE_URL+'state/index?token=' + this.access_token + '&limit=' + 1000 + "&search=" + searchString).subscribe(data => {
        this.stateList = data.json().docs;
        this.pager.pageSize = data.json().limit;
        this.pager.totalItems = data.json().total;
        this.setPage();
        console.log("State  PArse", this.stateList);
      });
    }
    else {
      console.log("SEARCH_EMPTY");
      this.stateList = this.backupStateList;
      this.pager=this.savePagerStatus;
      console.log("PAGER_CURRENT",this.pager);
      console.log("BACKUP_PAGER",this.savePagerStatus);
    }
  }
}
