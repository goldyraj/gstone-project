import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ApiserviceService]
})
export class HomeComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('button2') button2: ElementRef;
  @ViewChild('loginForm') loginForm: ElementRef;
  // model: any = {};

  notificationList = [];
  stateList = [];
  internalUpdateList = [];
  videosList = [];
  StateVal = {};
  url = '';
  notiRowData;
  rowDataIndex = '';
  Paging = {
    page: 1,
    limit: 2
  };
  TotalPages: number;
  pageSize: number;
  currentPage: number;
  loading = false;
  modelHide = '';
  access_token = '';
  userDetails = [];
  public userIsLogged: boolean;
  public errorType: boolean;
  reg = {};
  errorMsg = '';
  selectedState = '';
  selectedCountry = [];
  venderList = [];
  public myForm: FormGroup; // our model driven form
  public LoginForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public LoginSubmitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  constructor(public http: Http, private router: Router, private _fb: FormBuilder,public apiserviceService: ApiserviceService) {
    // this.getNotificationList();
    // this.getVideosList();
    // this.getInternalUpdateList();
    this.getStateList();
    this.access_token = localStorage.getItem('user_token');
    console.log('user token', this.access_token);
    this.checkAuth();
  }


  onInput($event) {
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
    this.selectedState = $event.target.value;
  }
  ngOnInit() {

    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('.*\\S.*')]),
      contact: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      pan_no: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      email: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required, Validators.pattern('.*\\S.*')]),
      address: new FormControl('', [<any>Validators.required, Validators.pattern('.*\\S.*')]),
      city: new FormControl('', [<any>Validators.required, Validators.pattern('.*\\S.*')]),
      userType: new FormControl('', [<any>Validators.required]),
      password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      confirm_paasword: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      state: new FormControl('', [<any>Validators.required]),

    });
    this.LoginForm = new FormGroup({
      email: new FormControl('', [<any>Validators.required]),
      password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
    });
    // this.selectedCountry = this.stateList[1];

  }

  login(username: string, Paasword: string) {
    console.log('Hello Log in Module is ready!!');
    console.log(username, Paasword);
  }


  checkAuth() {
    console.log('auth called');
    this.http.get(this.apiserviceService.BASE_URL+'auth/check?token=' + this.access_token).subscribe(data => {
      this.userDetails = data.json().info;
      this.userIsLogged = data.json().success;
      console.log('State  PArse', this.userDetails);
      console.log('userIsLogged', this.userIsLogged);
    }, error => {
      console.log('error', error.message);
      this.userIsLogged = error.json().success;
      console.log(error.text());
    });
  }


  getStateList() {
    console.log('list called');
    this.http.get(this.apiserviceService.BASE_URL+'state/list').subscribe(data => {
      this.stateList = data.json().state;
      this.TotalPages = data.json().total;
      this.pageSize = this.Paging.limit;
      this.currentPage = this.Paging.page;
      console.log('getStateList', this.stateList);
      console.log('TotalPages', this.TotalPages);
    });
  }


  submitForm(isValid: boolean) {
    this.LoginSubmitted = true; // set form submit to true
    console.log(isValid);
    console.log('hi form module is called from page');
    this.StateVal = this.LoginForm.value;
    console.log('form valuse', this.StateVal);

    if (isValid === true) {

      const body = {
        'username': this.LoginForm.value.email,
        'password': this.LoginForm.value.password
      };
      this.url = this.apiserviceService.BASE_URL+'auth/login';
      return this.http.post(this.url, body)
        .subscribe(
        response => {
          // localStorage.setItem('user_token', response.json().token);
          this.http.get(this.apiserviceService.BASE_URL+'auth/check?token=' + response.json().token).subscribe(data => {
            this.userDetails = data.json().info;
            this.userIsLogged = data.json().success;
            console.log(response.json().message);

            if (this.userDetails['admin'] === true) {
              this.button2.nativeElement.click();
              this.router.navigate(['/admin/dashboard']);
              localStorage.setItem('admin_token', response.json().token);
            } else {
              this.button2.nativeElement.click();
              this.router.navigate(['/user']);
              localStorage.setItem('user_token', response.json().token);
              localStorage.setItem('user_gstin', this.userDetails['gstin']);
              localStorage.setItem('user_pan_no', this.userDetails['pan_no']);
              localStorage.setItem('user_contact', this.userDetails['contact']);
            }
            // this.router.navigate(['/user']);
            console.log('State  PArse', this.userDetails);
            console.log('userIsLogged', this.userIsLogged);
            console.log('type', this.userDetails['type']);
            this.LoginSubmitted = false;
          }, error => {
            console.log('error', error.message);
            this.userIsLogged = error.json().success;
            console.log(error.text());
          });
          // console.log(response.json().message);
          // this.button2.nativeElement.click();
          // this.router.navigate(['/user']);
        },
        error => {
          console.log(error.text());
          this.errorType = false;
          this.errorMsg = error.json().message;
          // this.LoginForm.reset();
          // this.router.navigate(['/home']);
        }
        );
    }
  }

  logout() {
    console.log('logged out');
    localStorage.clear();
    window.location.reload();
    this.router.navigate(['/home']);
  }

  saveReg(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log('form val', this.myForm.value.name);
    this.reg = this.myForm.value;
    console.log('form valuse', this.reg);
    if (isValid === true) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        'name': this.myForm.value.name,
        'username': this.myForm.value.email,
        'password': this.myForm.value.password,
        'pan_no': this.myForm.value.pan_no,
        'gstin': this.myForm.value.gstin,
        'city': this.myForm.value.city,
        'contact': this.myForm.value.contact,
        'email': this.myForm.value.email,
        'address': this.myForm.value.address,
        'state': "madhya pradesh",
        'type': 'agentuser'
        // 'type': this.myForm.value.userType
      };


      this.url = this.apiserviceService.BASE_URL+'auth/register';
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log('suceessfull data', response.json().message);
          this.closeModal();
          this.myForm.reset();
          this.submitted = false;
          this.saveTodos(true);
          this.errorMsg = response.json().message;
          this.loginForm.nativeElement.click();
        },
        error => {
          // console.log('error', error.message);
          console.log(error.text());
          console.log('real error msg', error.json().message);
          const errorval = error.json().message;
          console.log('real error msg : ', errorval.substr(56, 9));
          if (errorval.substr(56, 9) === 'contact_1') {
            this.errorMsg = 'Contact No is already register.';
          } else if (errorval.substr(56, 8) === 'pan_no_1') {
            this.errorMsg = 'Pan No is already register.';
          } else {
            this.errorMsg = 'Email id is already register.';
          }
          console.log('error msg', this.errorMsg);
          this.saveTodos(false);
          // this.errorMsg = error.json().message;
        }
        );
    }
  }

  selectType(data) {
    if (data) {
      console.log('DATA', data);
      this.myForm.get('userType').setValue(data);
    }
    this.notiRowData = data;
    console.log('tpe', this.notiRowData);
  }
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  saveTodos(val) {
    // show box msg
    this.errorType = val;
    // wait 3 Seconds and hide
    setTimeout(function () {
      this.errorType = null;
      console.log(this.errorType);
    }.bind(this), 3000);
  }

}
