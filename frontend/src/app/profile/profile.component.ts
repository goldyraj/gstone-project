import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  rowDataIndex;
  public changePassForm: FormGroup; // our model driven form
  public myFormEdit: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  public vendorList: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  access_token;
  user_name;
  vender = [];
  url = "";
  errorMsg;
  userDetail = [];
  public errorType: boolean;


  constructor(private _fb: FormBuilder, private http: Http, ) {
    this.access_token = localStorage.getItem("user_token");
    this.user_name = localStorage.getItem("user_name");
    this.getUserList();
  }

  ngOnInit() {
    this.changePassForm = new FormGroup({
      oldPass: new FormControl('', [<any>Validators.required]),
      newPass: new FormControl('', [<any>Validators.required]),
      confirPass: new FormControl('', [<any>Validators.required]),
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
    this.http.get('http://localhost:3000/api/auth/check?token=' + this.access_token).subscribe(data => {
      this.userDetail = data.json().info;
      console.log("userDetail", this.userDetail);
    });
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
