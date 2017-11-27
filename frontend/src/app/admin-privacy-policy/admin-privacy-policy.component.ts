import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-admin-privacy-policy',
  templateUrl: './admin-privacy-policy.component.html',
  styleUrls: ['./admin-privacy-policy.component.css'],
  providers:[ApiserviceService]
})
export class AdminPrivacyPolicyComponent implements OnInit {

  PrivacyPolicy:any;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;

  StateVal = {};
  url = "";
  notiRowData;
  rowDataIndex = "";
  access_token;
  public editPolicy: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  constructor(private _fb: FormBuilder, private http: Http,public ApiserviceService:ApiserviceService) {
    this.access_token = localStorage.getItem("admin_token");
    this.getPrivacyPolicy();
  }

  ngOnInit() {
    this.editPolicy = new FormGroup({
      discription: new FormControl('', [<any>Validators.required]),
    });
  }
  getPrivacyPolicy() {
    console.log('list called');
    this.http.get(this.ApiserviceService.BASE_URL+'privacy/list?token='+this.access_token).subscribe(data => {
      this.PrivacyPolicy = data.json().privacy[0];
      console.log("State  PArse", this.PrivacyPolicy);
    });
  }


  editPolicyRecord(data) {
    
    var temp;
    if (data._id) {
      console.log("DATA", data);
      this.editPolicy.get("discription").setValue(data.discription);
      this.notiRowData = data;
    }
    
  }

  updateOrAddPolicy(isValid: boolean)
  {
    if(this.notiRowData)
    {
      this.updatePrivacyPolicy(isValid);
    }
    else
    {
      this.addPrivacyPolicy(isValid);
    }
  }

  updatePrivacyPolicy(isValid: boolean) {
    this.submittedEdit = true; // set form submit to true
    console.log(isValid);
    
    this.StateVal = this.editPolicy.value;
    console.log("form valuse", this.StateVal, this.notiRowData._id);

    if (isValid == true) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });

      const body = {
        "_id": this.notiRowData._id,
        "discription": this.editPolicy.value.discription
      };
      console.log("body", body);

      this.url = this.ApiserviceService.BASE_URL+"privacy/update?token="+this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.submittedEdit = false;
          this.getPrivacyPolicy();
          // alert(response.json().message);
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  addPrivacyPolicy(isValid: boolean) {
    this.submittedEdit = true; // set form submit to true
    console.log(isValid);
    
    this.StateVal = this.editPolicy.value;

    if (isValid == true) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({ headers: headers });

      const body = {
        // "_id": this.notiRowData._id,
        "discription": this.editPolicy.value.discription
      };
      console.log("body", body);

      this.url = this.ApiserviceService.BASE_URL+"privacy/create?token="+this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.submittedEdit = false;
          this.getPrivacyPolicy();
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
  private closeEditModal(): void {
    this.closeBtn2.nativeElement.click();
  }
  private closeDeleteModal(): void {
    this.closeBtn3.nativeElement.click();
  }
}
