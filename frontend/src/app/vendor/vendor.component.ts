import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  // constructor() { }
  @ViewChild('closeBtn') closeBtn: ElementRef;

  modelHide = '';
  url = "";
  vender = {};
  venderList = [];
  public myForm: FormGroup; // our model driven form
  public myFormEdit:FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public vendorRowData;
  constructor(private _fb: FormBuilder, private http: Http) {
    this.getVenderList();
    console.log("custructor call");
  }

  ngOnInit() {
    // we will initialize our form model here
    this.myForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      address: new FormControl('', [<any>Validators.required]),
      state:new FormControl('Select State')
    });
  }

  saveVender(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("form val", this.myForm.value.name);
    this.vender = this.myForm.value;
    console.log("form valuse", this.vender);

    if (isValid == true) {

      var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Expose-Headers', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "name": this.myForm.value.name,
        "gstin": this.myForm.value.gstin,
        "address": this.myForm.value.address,
        "state": this.myForm.value.state
      };
      this.url = "http://localhost:3000/api/vendor/create";
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          alert(response.json().message);
          this.getVenderList();
          this.myForm.reset();
          this.myForm.get("state").setValue("Select State");
          // this.venderList.push(body);
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  getVenderList() {

    this.http.get('http://localhost:3000/api/vendor/index').subscribe(data => {
      this.venderList = data.json().docs;
      console.log("verder  PArse", this.venderList);
    });
  }
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  // closeDeleteModal()
  // {
  //   this.closeBtn3.nativeElement.click();
  // }

  recordToDelete(item)
  {
    this.vendorRowData=item;
  }

  // deleteRecord()
  // {
  //   var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
  //   const headers = new Headers();

  //   headers.append('Content-Type', 'application/json');
  //   headers.append('x-access-token', access_token);
  //   const requestOptions = new RequestOptions({ headers: headers });
    
  //   this.url = "http://localhost:3000/api/vendor/delete/"+this.vendorRowData._id;
  //   return this.http.delete(this.url, requestOptions)
  //     .subscribe(
  //     response => {
  //       console.log("suceessfull data", response.json().message);
  //       this.closeDeleteModal();
  //       alert(response.json().message);
  //       this.getVenderList();
  //     },
  //     error => {
  //       alert(error.message);
  //       console.log("error", error.message);
  //       console.log(error.text());
  //     }
  //     );
  // }

}
