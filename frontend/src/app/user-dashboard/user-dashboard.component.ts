import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ExcelServiceService } from '../excel-service.service';
import {PagerService} from '../service/pager.service';
import { RouterModule, Routes, Router } from '@angular/router';
import * as _ from 'underscore'

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers:[ExcelServiceService,PagerService]
})
export class UserDashboardComponent implements OnInit {

  headers: Headers;
  branchesList: Array<{ name: string, contact: string, panNo: string, email: string, gstin: string, address: string, selectedDealer: string, city: string, branchName: string, state: string }> = [];
  isEditingClicked: boolean;
  publicBranchData;
  selectedDealerStateEdit = "0";
  selectedDealerStateNew = "0";
  // constructor() { }
  @ViewChild('closeBtn') closeBtn: ElementRef;
  modelHide = '';
  url = "";
  cutomer = {};
  stateList=[];
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public csvString: string;
  access_token;
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  // private http: Http HttpClient,
  public userName:string;
  constructor(private _fb: FormBuilder, private http: Http, public excelServiceService: ExcelServiceService,public PagerService:PagerService,private router: Router) {
    this.isEditingClicked = false;
    this.pager.currentPage = 1;
    this.access_token = localStorage.getItem("user_token");
    this.userName=localStorage.getItem("user_name");
    this.getBranches(1);
    this.getStateList();
  } // form builder simplify form initialization

  ngOnInit() {
    // we will initialize our form model here
    if (this.access_token == null) {
      this.router.navigate(['/home']);
      return;
    }
    this.myForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      contact: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      pan_no: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      email: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      address: new FormControl('', [<any>Validators.required]),
      city: new FormControl('', [<any>Validators.required]),
      branch_name: new FormControl('', [<any>Validators.required]),
      selectedState: new FormControl('-1'),
      selectedDealer: new FormControl('-1')
      // address: new FormGroup({
      //   street: new FormControl('', <any>Validators.required),
      //   postcode: new FormControl('8000')
      // })
    });
  }


  save(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    console.log("form val", this.myForm.value.name);
    this.cutomer = this.myForm.value;
    console.log("form valuse", this.cutomer);

    if (isValid == true) {

      // var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "name": this.myForm.value.name,
        "pan_no": this.myForm.value.pan_no,
        "gstin": this.myForm.value.gstin,
        "city": this.myForm.value.city,
        "contact": this.myForm.value.contact,
        "email": this.myForm.value.email,
        "address": this.myForm.value.address,
        "state": this.myForm.value.selectedState,
        "branch_name": this.myForm.value.branch_name
      };
      this.url = "http://localhost:3000/api/customer/create?token="+this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          // alert(response.json().message);
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  getBranches(page:number) {
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

    this.http.get('http://localhost:3000/api/branch/index?token='+this.access_token+'&page='+this.pager.currentPage+'&limit='+5, options)
      .subscribe(
      response => {
        
        console.log("BRANCH_LIST_API_RESPONSE_2", response.json().docs);
        this.branchesList=response.json().docs;
        this.pager.pageSize = response.json().limit;
        this.pager.totalItems = response.json().total;
        this.setPage();
        // for (let data of response.json().docs) {
        //   this.branchesList.push({ name: data.name, contact: data.contact, panNo: data.pan_no, email: data.email, gstin: data.gstin, address: data.address, selectedDealer: data.state, city: data.city, branchName: data.branch_name, state: data.state });
        // }
      },
      error => {
        // alert(error.text());
        console.log(error.text());
      }
      );
  }

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.PagerService.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.branchesList;
  }

  getStateList() {
    console.log('list called');
    this.http.get('http://localhost:3000/api/state/list').subscribe(data => {
      this.stateList = data.json().state;
      // this.TotalPages = data.json().total;
      // this.pageSize = this.Paging.limit;
      // this.currentPage = this.Paging.page;
      console.log("pagecount", )
      console.log("getStateList", this.stateList);
      // console.log("TotalPages", this.TotalPages);
    });
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
        this.csvString = this.excelServiceService.CSV2JSON(csv);
        // var csvString=this.CSV2JSON(csv);
        // this.uploadCsvFileToServer(csvString);
      }
    }
  }

  uploadCsvFileToServer() {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });
    const body = {
      "data": JSON.parse(this.csvString)
    };

    this.url = "http://localhost:3000/api/branch/uploadFile?token="+this.access_token;
    return this.http.post(this.url, body, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json());
        this.closeModal();
        if (response.json().message != null) {
          alert(response.json().message);
          this.getBranches(this.pager.currentPage);
        }
        else if (response.json().error != null) {
          alert("Your CSV/Excel file contains some repeated data !");
        }
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
        var errorString = error.text();

        if (errorString != null) {
          alert("Your CSV/Excel file contains some repeated data !");
        }
      }
      );
  }

  downloadJSONTOCSV() {
    this.getBranches(this.pager.currentPage);
    this.excelServiceService.exportAsExcelFile(this.branchesList, "BranchesJSNTOCSV");
  }
}
