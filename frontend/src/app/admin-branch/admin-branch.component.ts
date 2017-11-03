import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import {DatePickerComponent} from 'ng2-bootstrap/datepicker';
// import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
// import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-branch',
  templateUrl: './admin-branch.component.html',
  styleUrls: ['./admin-branch.component.css'],
})
export class AdminBranchComponent implements OnInit {


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
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  // private http: Http HttpClient,
  constructor(private _fb: FormBuilder, private http: Http) { 
    this.isEditingClicked = false;
    this.getBranches();
  } // form builder simplify form initialization

  ngOnInit() {
    // we will initialize our form model here
    this.myForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      contact: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      pan_no: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      email: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      address: new FormControl('', [<any>Validators.required]),
      city: new FormControl('', [<any>Validators.required]),
      branch_name: new FormControl('', [<any>Validators.required]),
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
     
      var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "name": this.myForm.value.name,
        "pan_no": this.myForm.value.pan_no,
        "gstin": this.myForm.value.gstin,
        "city": this.myForm.value.city,
        "contact": this.myForm.value.contact,
        "email": this.myForm.value.email,
        "address": this.myForm.value.address,
        "state": "Madhya Pradesh"
      };
      this.url = "http://localhost:3000/api/customer/create";
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
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

  getBranches() {
    var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWY2ZjViMmI3N2VlNDE3OTQxMjcyNzYiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1MDkzNTcwNzMsImV4cCI6MTUwOTk2MTg3MywiaXNzIjoidmVsb3BlcnQuY29tIiwic3ViIjoidXNlckluZm8ifQ._hAcH1LXddHTP1jdgaGqdKkeWU0eHux5K-iPxCRQ-14";

    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('x-access-token', access_token);
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    // headers.append('Accept','charset=utf-8');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/branch/index', options)
      .subscribe(
      response => {
        console.log("BRANCH_LIST_API_RESPONSE",response.json());
        console.log("BRANCH_LIST_API_RESPONSE_2",response.json().docs);
        for(let data of response.json().docs)
        {
          this.branchesList.push({ name: data.name, contact: data.contact, panNo: data.pan_no, email: data.email, gstin: data.gstin, address: data.address, selectedDealer: data.state, city: data.city, branchName: data.branch_name, state: data.state });
        }
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );
  }

}
