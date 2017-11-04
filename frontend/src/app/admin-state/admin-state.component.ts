import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-admin-state',
  templateUrl: './admin-state.component.html',
  styleUrls: ['./admin-state.component.css']
})
export class AdminStateComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  modelHide = '';
  url = "";
  StateVal = {};
  stateList = [];
  country;
  person = {
    name: 'ox',
    country: { id: 0, name: 'Select Status' }
  }
  countries = [
    { id: 0, name: 'Select Status' },
    { id: 1, name: 'c1' },
    { id: 2, name: 'c2' },
    { id: 3, name: 'c3' },
    { id: 4, name: 'c4' }
  ]

  Paging = {
    page: 1,
    limit: 5
  };
  TotalPages: number;
  pageSize: number;
  currentPage: number;
  public myForm: FormGroup; // our model driven form
  public myFormEdit: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public stateRowData;
  constructor(private _fb: FormBuilder, private http: Http) {
    this.getStateList();
    console.log("cusntor call");
    this.person.country = this.countries.filter(c => c.id === this.person.country.id)[0];
  }

  ngOnInit() {
    // we will initialize our form model here
    this.myForm = new FormGroup({
      statename: new FormControl('', [<any>Validators.required]),
      statecode: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      country: new FormControl('Select Status', [])
    });

    this.myFormEdit = new FormGroup({
      statename: new FormControl('', [<any>Validators.required]),
      statecode: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      country: new FormControl('Select Status', [])
    });

  }


  saveState(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    console.log("form val", this.myForm.value.name);
    this.StateVal = this.myForm.value;
    console.log("form valuse", this.StateVal);

    if (isValid == true) {

      var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "name": this.myForm.value.statename,
        "code": this.myForm.value.statecode
      };
      this.stateList.push(body);
      this.url = "http://localhost:3000/api/state/create";
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          alert(response.json().message);
          this.getStateList();
          this.myForm.reset();
          this.myForm.get("country").setValue("Select Status");
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
          alert(error.text());
        }
        );
    }
  }

  getStateList() {
    this.http.get('http://localhost:3000/api/state/index?limit=' + this.Paging.limit + '&page=' + this.Paging.page).subscribe(data => {
      this.stateList = data.json().docs;
      this.TotalPages = data.json().total;
      this.pageSize = this.Paging.limit;
      this.currentPage = this.Paging.page;
      console.log("State  PArse", this.stateList);
    });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  private closeEditModal(): void {
    this.closeBtn2.nativeElement.click();
  }

  nextPage() {
    console.log("paging");
    if (this.Paging.page < this.TotalPages) {
      this.Paging.page++;
      this.getStateList();
    }
  }

  previousPage() {
    console.log("paging");
    if (this.Paging.page > 1) {
      this.Paging.page--;
      this.getStateList();
    }
  }

  editStateRecords(data) {
    var temp;
    if (data) {
      console.log("DATA", data);

      this.myFormEdit.get("statename").setValue(data.name);
      this.myFormEdit.get("statecode").setValue(data.code);
      this.myFormEdit.get("country").setValue(data.country);
    }
    this.country=data.country;
    this.stateRowData = data;
  }

  updateState(isValid: boolean) {

    console.log("EDIITITITT");
    this.submitted = true; // set form submit to true
    console.log(isValid);

    // if (isValid == true && this.myFormEdit.value.selectedstateDropdown!='Select State') {
    if (isValid == true) {

      var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });

      const body = {
        "_id": this.stateRowData._id,
        "name": this.myFormEdit.value.descriptionEdit,
        "code": this.myFormEdit.value.hsn_code_edit
      };

      this.url = "http://localhost:3000/api/state/update";
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.submitted = false;
          // this.hsnCodeData.push(body);
          alert(response.json().message);
          // this.goodsAndServicesDataList[this.rowDataIndex]=body;
          this.getStateList();
        },
        error => {
          // this.closeEditModal();
          console.log("error", error.message);
          console.log(error.text());
          alert(error.text());
        }
        );
    }
  }

}
