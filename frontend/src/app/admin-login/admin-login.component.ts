import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  StateVal = {};
  url ="";
  public adminLoginForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public loginSuccess=0;
  constructor(private _fb: FormBuilder,private router: Router, private http: Http) {
  }

  ngOnInit() {
    this.adminLoginForm = new FormGroup({
      email: new FormControl('abc@gmail.com', [<any>Validators.required]),
      password: new FormControl('admin', [<any>Validators.required]),
    });
  }

  login(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    this.StateVal = this.adminLoginForm.value;
    console.log("form valuse", this.StateVal);

    if (isValid == true) {

      const body = {
        "username": this.adminLoginForm.value.email,
        "password": this.adminLoginForm.value.password
      };
      this.url = "http://localhost:3000/api/auth/login";
      return this.http.post(this.url, body)
        .subscribe(
        response => {
          console.log("token", response.json().token);
          localStorage.setItem('admin_token', response.json().token);
          this.loginSuccess=1;
          this.router.navigate(['/admin/dashboard']);
          // this.router.navigateByUrl('/admin/dashboard', { skipLocationChange: true });
          this.submitted=false;
          // this.closeModal();
        },
        error => {
          this.loginSuccess=-1;
          console.log(error.json().message);
        }
        );
    }
  }

}
