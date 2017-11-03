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
  modelHide = '';
  url = "";
  StateVal = {};
  stateList = [];
  person = {
    name: 'ox',
    country: { id: 0, name: 'Select Status'}
  }
  countries = [
    { id: 0, name: 'Select Status' },
    { id: 1, name: 'c1' },
    { id: 2, name: 'c2' },
    { id: 3, name: 'c3' },
    { id: 4, name: 'c4' }
  ]

  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
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
      country: new FormControl('', []),
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
          this.stateList.pop();
          this.getStateList();
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  getStateList() {
    this.http.get('http://localhost:3000/api/state/index').subscribe(data => {
      this.stateList = data.json().docs;
      console.log("State  PArse", this.stateList);
    });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

}
