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
  public editProfileForm: FormGroup;
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
  }

  ngOnInit() {
    this.changePassForm = new FormGroup({
      oldPass: new FormControl('', [<any>Validators.required]),
      newPass: new FormControl('', [<any>Validators.required]),
      confirPass: new FormControl('', [<any>Validators.required]),
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
    // if (isValid == true) {

    //   const headers = new Headers();

    //   headers.append('Content-Type', 'application/json');
    //   // headers.append('x-access-token', this.access_token);
    //   const requestOptions = new RequestOptions({ headers: headers });

    //   const body = {
    //     "_id": this.venderRowData._id,
    //     "name": this.myFormEdit.value.name,
    //     "gstin": this.myFormEdit.value.gstin,
    //     "address": this.myFormEdit.value.address,
    //     "state": this.selectedState
    //   };
    //   console.log("body", body);

    //   this.url = "http://localhost:3000/api/vendor/update?token=" + this.access_token;
    //   return this.http.put(this.url, body, requestOptions)
    //     .subscribe(
    //     response => {
    //       console.log("suceessfull data", response.json().message);
    //       this.closeEditModal();
    //       this.submittedEdit = false;
    //       this.getVenderList(this.pager.currentPage);
    //       // this.hsnCodeData.push(body);

    //       this.venderList[this.rowDataIndex] = body;
    //       // alert(response.json().message);
    //     },
    //     error => {
    //       // this.closeEditModal();
    //       console.log("error", error.message);
    //       console.log(error.text());
    //     }
    //     );
    // }
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
