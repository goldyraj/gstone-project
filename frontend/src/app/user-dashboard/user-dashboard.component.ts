import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ExcelServiceService } from '../excel-service.service';
import { PagerService } from '../service/pager.service';
import { RouterModule, Routes, Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  providers: [ExcelServiceService, PagerService]
})
export class UserDashboardComponent implements OnInit {

  @ViewChild('closeCsv') closeCsv: ElementRef;
  @ViewChild('closeChoose') closeChoose: ElementRef;
  // @ViewChild('uploadCsvFileControl') uploadCsvFileControl: ElementRef;
  @ViewChild('clearInputFile') clearInputFile: ElementRef;

  filename;
  ifSuccess: boolean;
  isDownloadSuccessful: boolean;
  headers: Headers;
  branchesList = [];
  isEditingClicked: boolean;
  publicBranchData;
  selectedDealerStateEdit = '0';
  selectedDealerStateNew = '0';
  jsonString;
  // constructor() { }
  @ViewChild('closeBtn') closeBtn: ElementRef;
  modelHide = '';
  url = '';
  cutomer = {};
  errorMsg = '';
  public errorType: boolean;
  stateList = [];
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public isBranchList: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public csvString: string;
  access_token;
  // pager object
  pager: any = {};
  userDetails = [];
  dealerType = [];
  selectedState = '';
  selectedDealer = '';

  // paged items
  pagedItems: any[];
  // private http: Http HttpClient,
  public userName: string;
  constructor(private _fb: FormBuilder, private http: Http, public excelServiceService: ExcelServiceService, public PagerService: PagerService, private router: Router) {
    this.isEditingClicked = false;
    this.pager.currentPage = 1;
    this.access_token = localStorage.getItem('user_token');
    this.userName = localStorage.getItem('user_name');
    this.getBranches(1);
    this.getStateList();
    this.checkAuth();
    this.dealerType = [
      { "id": "1", "name": "Regular" },
      { "id": "2", "name": "Composition" },
      { "id": "3", "name": "ISD" },
      { "id": "3", "name": "E-Commerce" }
    ];
  } // form builder simplify form initialization

  ngOnInit() {
    // we will initialize our form model here
    if (this.access_token == null) {
      this.router.navigate(['/home']);
      return;
    }
    this.myForm = new FormGroup({
      name: new FormControl('asd', [<any>Validators.required]),
      contact: new FormControl('9889562315', [<any>Validators.required, <any>Validators.minLength(10)]),
      pan_no: new FormControl('YHSDS2345E', [<any>Validators.required, <any>Validators.minLength(10)]),
      email: new FormControl('adb@adsfo.com', [<any>Validators.required]),
      gstin: new FormControl('adsf', [<any>Validators.required]),
      address: new FormControl('adsf', [<any>Validators.required]),
      city: new FormControl('asdf', [<any>Validators.required]),
      branch_name: new FormControl('adsf', [<any>Validators.required]),
      state: new FormControl(''),
      selectedDealer: new FormControl('')
      // address: new FormGroup({
      //   street: new FormControl('', <any>Validators.required),
      //   postcode: new FormControl('8000')
      // })
    });
  }


  checkAuth() {
    console.log('auth called');
    this.http.get('http://localhost:3000/api/auth/check?token=' + this.access_token).subscribe(data => {
      this.userDetails = data.json().info;
      // this.userIsLogged = data.json().success;
      console.log('user details', this.userDetails);
      localStorage.setItem('user_name', this.userDetails['username']);
      // console.log('userIsLogged', this.userIsLogged);
    }, error => {
      console.log('error', error.message);
      // this.userIsLogged = error.json().success;
      console.log(error.text());
    });
  }
  onInput($event) {
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
    this.selectedState = $event.target.value;
  }

  onDealerInput($event) {
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
    this.selectedDealer = $event.target.value;
  }

  save(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log('hi form module is called from page');
    console.log('form val', this.myForm.value.name);
    this.cutomer = this.myForm.value;
    console.log('form valuse', this.cutomer);

    if (isValid == true) {

      // var access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw';
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        'name': this.myForm.value.name,
        'pan_no': this.myForm.value.pan_no,
        'gstin': this.myForm.value.gstin,
        'city': this.myForm.value.city,
        'contact': this.myForm.value.contact,
        'email': this.myForm.value.email,
        'address': this.myForm.value.address,
        'state': this.selectedState,
        'branch_name': this.myForm.value.branch_name,
        'dealer_type': this.selectedDealer

      };
      this.url = 'http://localhost:3000/api/branch/create?token=' + this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log('suceessfull data', response.json().message);
          this.closeModal();
          // alert(response.json().message);
          this.getBranches(this.pager.currentPage)
          this.saveTodos(true);
          this.errorMsg = response.json().message;

          // this.changePassForm.reset();
          this.submitted = false;
        },
        error => {
          console.log('error', error.message);
          console.log(error.text());
          this.errorType = true;
          this.saveTodos(false);
          const errorval = error.text();
          console.log('real error msg : ', errorval.substr(72, 9));
          if (errorval.substr(72, 8) === 'pan_no_1') {
            this.errorMsg = 'Pan No is already register.';
          } else {
            this.errorMsg = 'Branch Name alerdy exists';
          }
        }
        );
    }
  }
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  saveTodos(val) {
    //show box msg
    this.errorType = val;
    //wait 3 Seconds and hide
    setTimeout(function () {
      this.errorType = null;
      console.log(this.errorType);
    }.bind(this), 3000);
  }

  getBranches(page: number) {
    this.pager.currentPage = page;
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    // myHeaders.append('x-access-token', access_token);
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    // headers.append('Accept','charset=utf-8');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/branch/index?token=' + this.access_token + '&page=' + this.pager.currentPage + '&limit=' + 5, options)
      .subscribe(
      response => {

        console.log('BRANCH_LIST_API_RESPONSE_2', response.json().docs);
        this.branchesList = response.json().docs;
        this.pager.pageSize = response.json().limit;
        let isList = this.branchesList.length;
        this.pager.totalItems = response.json().total;
        this.setPage();
        if (isList === 0) {
          this.isBranchList = true;
          // console.log('')
        } else {
          this.isBranchList = false;
        }

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
    console.log('pager', this.pager);
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
      console.log('pagecount', )
      console.log('getStateList', this.stateList);
      // console.log('TotalPages', this.TotalPages);
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
      'data': JSON.parse(this.jsonString)
    };

    console.log('CSV_DATA', body);

    this.url = 'http://localhost:3000/api/branch/uploadFile?token=' + this.access_token;

    return this.http.post(this.url, body, requestOptions)
      .subscribe(
      response => {
        console.log('suceessfull data', response.json().message);
        this.closeModal();
        this.closeCsv.nativeElement.click();
        this.closeChoose.nativeElement.click();
        // this.uploadCsvFileControl.nativeElement.value = '';

        this.ifSuccess = true;
        this.getBranches(this.pager.currentPage);
        // alert(response.json().message);
      },
      error => {
        console.log('error', error.message);
        console.log(error.text());
      }
      );
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

    this.http.get('http://localhost:3000/api/branch/index?token=' + this.access_token, options)
      .subscribe(
      response => {
        exportedList = response.json().docs;
        this.excelServiceService.exportAsExcelFile(exportedList, String(this.excelServiceService.getCurrentDateAndTime()));
        this.isDownloadSuccessful = true;
      },
      error => {
        // alert(error.text());
        console.log(error.text());
      }
      );
  }

  closeDownloadModal() {
    this.isDownloadSuccessful = false;
  }

  resetForm() {
    this.myForm.reset();
  }

  clearCSVForm() {
    this.clearInputFile.nativeElement.value = "";
    this.ifSuccess = false;
  }
}
