import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers:[ApiserviceService]
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;
  contact = [];
  url = "";
  errorMsg = "";
  alertType = "";
  public errorType: boolean;
  public submitted: boolean; // keep track on whether form is submitted
  constructor(private _fb: FormBuilder, private http: Http,public apiserviceService: ApiserviceService) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      email: new FormControl('', [<any>Validators.required]),
      contact: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      company: new FormControl('', [<any>Validators.required]),
      remarks: new FormControl('')
    });
    this.url = "";
    this.errorMsg = "";
  }


  sendContact(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    console.log("form val", this.contactForm.value.name);
    this.contact = this.contactForm.value;
    console.log("form valuse", this.contact);

    if (isValid == true) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "name": this.contactForm.value.name,
        "email": this.contactForm.value.email,
        "company": this.contactForm.value.company,
        "contact_no": this.contactForm.value.contact,
        "remark": this.contactForm.value.remarks
      };

      this.url = this.apiserviceService.BASE_URL+"contact/create";
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);

          // this.errorType = true;
          // setTimeout(function () {
          //   // this.edited = false;
          //   this.errorType = true;
          //   console.log(this.errorType);
          // }.bind(this), 3000);
          this.saveTodos(true);
          this.errorMsg = response.json().message;
          this.contactForm.reset();
          this.submitted = false;
        },
        error => {
          // alert(error.message);
          console.log("error", error.message);
          console.log(error.text());
          // this.errorType = false;
          this.saveTodos(false);
          this.errorMsg = error.json().message;
        }
        );
    }
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
