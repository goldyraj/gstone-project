import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PagerService } from '../service/pager.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  rowDataIndex;
  public changePassForm: FormGroup; // our model driven form
  public editProfileForm: FormGroup;
  public editBranchFrom: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  public vendorList: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public isBranchList: boolean; // keep track on whether form is submitted
  access_token;
  user_name;
  vender = [];
  url = "";
  errorMsg;
  userDetail = [];
  branchesList = [];
  pagedItems: any[];
  pager: any = {};
  branchRowData = [];
  selectedState = '';
  stateList = [];
  dealerType = [];
  public errorType: boolean;


  constructor(private _fb: FormBuilder, private http: Http, public PagerService: PagerService, ) {
    this.access_token = localStorage.getItem("user_token");
    this.user_name = localStorage.getItem("user_name");
    this.getBranches(1);
    this.getStateList();
    this.dealerType = [
      { "id": "1", "name": "Regular" },
      { "id": "2", "name": "Composition" },
      { "id": "3", "name": "ISD" },
      { "id": "3", "name": "E-Commerce" }
    ];
  }

  ngOnInit() {
    this.changePassForm = new FormGroup({
      oldPass: new FormControl('', [<any>Validators.required]),
      newPass: new FormControl('', [<any>Validators.required]),
      confirPass: new FormControl('', [<any>Validators.required]),
    });
    this.editBranchFrom = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      contact: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      pan_no: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      email: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      address: new FormControl('', [<any>Validators.required]),
      city: new FormControl('', [<any>Validators.required]),
      branch_name: new FormControl('', [<any>Validators.required]),
      state: new FormControl(''),
      selectedDealer: new FormControl('')
    });
    this.editProfileForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      contact: new FormControl('', [<any>Validators.required]),
      pan_no: new FormControl('', [<any>Validators.required]),
      username: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      address: new FormControl('', [<any>Validators.required]),
      state: new FormControl('', [<any>Validators.required]),
      city: new FormControl('', [<any>Validators.required]),
    });
    this.getUserList();
  }



  onInput($event) {
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
    this.selectedState = $event.target.value;
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

  changePass(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("form val", this.changePassForm.value.name);
    this.vender = this.changePassForm.value;
    console.log("form valuse", this.vender);

    if (isValid == true) {

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "username": this.user_name,
        "password": this.changePassForm.value.oldPass,
        "newpassword": this.changePassForm.value.newPass,
      };
      this.url = "http://localhost:3000/api/user/changepassword?token=" + this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.saveTodos(true);
          this.errorMsg = response.json().message;
          this.changePassForm.reset();
          this.submitted = false;
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
          this.saveTodos(false);
          this.errorMsg = error.json().message;
        }
        );
    }
  }

  getUserList() {
    console.log('list called');
    this.http.get('http://localhost:3000/api/user/view?token=' + this.access_token).subscribe(data => {
      this.userDetail = data.json().data;
      console.log("userDetail", data);
      console.log("userDetail1", this.userDetail);
      console.log("name", this.userDetail['name']);
      this.editProfileForm.get("name").setValue(this.userDetail['name']);
      this.editProfileForm.get("contact").setValue(this.userDetail['contact']);
      this.editProfileForm.get("pan_no").setValue(this.userDetail['pan_no']);
      this.editProfileForm.get("username").setValue(this.userDetail['username']);
      this.editProfileForm.get("gstin").setValue(this.userDetail['gstin']);
      this.editProfileForm.get("address").setValue(this.userDetail['address']);
      this.editProfileForm.get("state").setValue(this.userDetail['state']);
      this.editProfileForm.get("city").setValue(this.userDetail['city']);
    });
  }

  editProfile(isValid: boolean) {
    this.submittedEdit = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    console.log("edited form data", this.editProfileForm.value);

    // if (isValid == true && this.myFormEdit.value.selectedstateDropdown!='Select State') {
    if (isValid == true) {

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', this.access_token);
      const requestOptions = new RequestOptions({ headers: headers });

      const body = {
        "address": this.editProfileForm.value.address,
        "city": this.editProfileForm.value.city,
        "contact": this.editProfileForm.value.contact,
        "name": this.editProfileForm.value.name,
        "pan_no": this.editProfileForm.value.pan_no,
        "state": this.editProfileForm.value.state,
        "gstin": this.editProfileForm.value.gstin,
        "type": this.userDetail['type'],
        "username": "abc@gmail.com",
        // "username": this.userDetail['username'],
        "email": "abc@gmail.com",
        // "email": this.userDetail['username'],
        "_id": this.userDetail['_id']
      };
      console.log("body", body);

      this.url = "http://localhost:3000/api/user/profileupdate/?token=" + this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.getUserList();
          this.saveTodos(true);
          this.submittedEdit = false;
          this.errorMsg = response.json().message;
        },
        error => {
          // this.closeEditModal();
          console.log("error", error.message);
          console.log(error.text());
          this.saveTodos(false);
          this.errorMsg = error.json().message;
        }
        );
    }
  }

  getBranches(page: number) {
    this.pager.currentPage = page;
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
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
      },
      error => {
        // alert(error.text());
        console.log(error.text());
      }
      );
  }

  editBranchRecord(data) {
    this.rowDataIndex = data._id;
    var temp;
    if (data) {
      console.log("DATA", data);

      this.editBranchFrom.get("name").setValue(data.name);
      this.editBranchFrom.get("pan_no").setValue(data.pan_no);
      this.editBranchFrom.get("gstin").setValue(data.gstin);
      this.editBranchFrom.get("city").setValue(data.city);
      this.editBranchFrom.get("contact").setValue(data.contact);
      this.editBranchFrom.get("email").setValue(data.email);
      this.editBranchFrom.get("address").setValue(data.address);
      this.editBranchFrom.get("state").setValue(data.state);
      this.editBranchFrom.get("branch_name").setValue(data.branch_name);
    }

    this.branchRowData = data;

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

  saveTodos(val) {
    //show box msg
    this.errorType = val;
    //wait 3 Seconds and hide
    setTimeout(function () {
      this.errorType = null;
      console.log(this.errorType);
    }.bind(this), 3000);
  }
}
