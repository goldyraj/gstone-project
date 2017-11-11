import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PagerService } from '../service/pager.service';
import * as _ from 'underscore';
import { RouterModule, Routes, Router } from '@angular/router';
import {PreventLoggedInAccess} from '../PreventLoggedInAccess';

@Component({
  selector: 'app-admin-state',
  templateUrl: './admin-state.component.html',
  styleUrls: ['./admin-state.component.css'],
  providers: [PagerService,PreventLoggedInAccess]
})
export class AdminStateComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;
  
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
  sortBy="created_at";

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
  constructor(private _fb: FormBuilder, private http: Http, private pagerService: PagerService,public router:Router) {
    // this.currentPage=1;
  }

  onLoad()
  {

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
      statename: new FormControl('', [<any>Validators.required]),
      statecode: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      country: new FormControl('Select Status', [])
    });

    this.myFormEdit = new FormGroup({
      statename: new FormControl('', [<any>Validators.required]),
      statecode: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      country: new FormControl('Select Status', [])
    });

    var context=this;
    if (localStorage.getItem('admin_token')!=null) {
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
      this.url = "http://localhost:3000/api/state/create?token="+this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          // alert(response.json().message);
          this.getStateList(this.pager.currentPage);
          this.myForm.reset();
          this.myForm.get("country").setValue("Select Status");
          this.submitted = false;
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
    this.http.get('http://localhost:3000/api/state/index?token=' + this.access_token + '&limit=' + 10 + '&page=' + this.pager.currentPage+"&sortBy="+this.sortBy).subscribe(data => {
      this.stateList = data.json().docs;
      // this.pager.TotalPages = data.json().total;
      this.pager.pageSize = data.json().limit;
      this.pager.totalItems = data.json().total;
      this.setPage();
      console.log("State  PArse", this.stateList);
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

  private closeDeleteModal()
  {
    this.closeBtn3.nativeElement.click();
  }

  editStateRecords(data) {
    var temp;
    
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

    console.log("EDIITITITT");
    this.submitted = true; // set form submit to true
    console.log(isValid);

    // if (isValid == true && this.myFormEdit.value.selectedstateDropdown!='Select State') {
    if (isValid == true) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      console.log("ID",this.stateRowData._id);
      const body = {
        "_id": this.stateRowData._id,
        "name": this.myFormEdit.value.statename,
        "code": this.myFormEdit.value.statecode
      };

      this.url = "http://localhost:3000/api/state/update?token="+this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.getStateList(this.pager.currentPage);
          this.submitted = false;
        },
        error => {
          // this.closeEditModal();
          console.log("error", error.message);
          console.log(error.text());
          alert(error.text());
        }
        );
    }
  }

  deleteRecord() {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({ headers: headers });
    console.log("_ID___", this.stateRowData._id);

    this.url = "http://localhost:3000/api/state/delete/" + this.stateRowData._id+"?token="+this.access_token;
    return this.http.delete(this.url, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeDeleteModal();

        // this.hsnCodeData.push(body);
        // alert(response.json().message);
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
}
