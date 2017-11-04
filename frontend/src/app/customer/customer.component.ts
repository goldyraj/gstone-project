import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  // constructor() { }
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  modelHide = '';
  url = "";
  cutomer = {};
  submittedEdit:boolean=false;
  custList = [];
  data =[];
  rowDataIndex;
  public myForm: FormGroup; // our model driven form
  public myFormEdit: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  customerRowData;
  stateDropdown=Array();
  constructor(private _fb: FormBuilder, private http: Http) {
    this.getCustomerList();
    console.log("custructor call");
  }

  ngOnInit() {

    this.stateDropdown.push("Jabalpur");
    this.stateDropdown.push("Bhopal");
    this.stateDropdown.push("Indore");

    this.myForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      contact: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      pan_no: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      email: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      address: new FormControl('', [<any>Validators.required]),
      city: new FormControl('', [<any>Validators.required]),
      selectedstateDropdown:new FormControl('Select State')
    });

    this.myFormEdit=new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      contact: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      pan_no: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      email: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      address: new FormControl('', [<any>Validators.required]),
      city: new FormControl('', [<any>Validators.required]),
      selectedstateDropdown:new FormControl('Select State')
    });
  }

  saveCustomer(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    console.log("form val", this.myForm.value.name);
    this.cutomer = this.myForm.value;
    console.log("form valuse", this.cutomer);

    if (isValid == true) {

      var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "name": this.myForm.value.name,
        "pan_no": this.myForm.value.pan_no,
        "gstin": this.myForm.value.gstin,
        "city": this.myForm.value.city,
        "contact": this.myForm.value.contact,
        "email": this.myForm.value.email,
        "address": this.myForm.value.address,
        "state": this.myForm.value.selectedstateDropdown
      };

      this.url = "http://localhost:3000/api/customer/create";
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          // this.custList.push(body);
          alert(response.json().message);
          this.myForm.reset();
          this.myForm.get("selectedstateDropdown").setValue("Select State");
          this.submitted=false;
          this.getCustomerList();
          this.customerRowData=null;
        },
        error => {
          alert(error.message);
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  getCustomerList() {
    this.http.get('http://localhost:3000/api/customer/index?limit=10&page=1&sortBy=title&search=').subscribe(data => {
      console.log("customer list", data);
      this.custList = data.json().docs;
      console.log("verder  PArse", this.custList);
    });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  private closeEditModal():void{
    this.closeBtn2.nativeElement.click();
  }

  editCustomerRecord(data)
  {
    this.rowDataIndex=data._id;
    var temp;
    if(data)
    {
      console.log("DATA",data);
      
      this.myFormEdit.get("name").setValue(data.name);
      this.myFormEdit.get("pan_no").setValue(data.pan_no);
      this.myFormEdit.get("gstin").setValue(data.gstin);
      this.myFormEdit.get("city").setValue(data.city);
      this.myFormEdit.get("contact").setValue(data.contact);
      this.myFormEdit.get("email").setValue(data.email);
      this.myFormEdit.get("address").setValue(data.address);
      // this.myFormEdit.get("state").setValue(data.state);
    }
    
    this.customerRowData=data;
    
  }

  updateCustomerRecord(isValid: boolean)
  {
    this.submittedEdit = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
  
    // if (isValid == true && this.myFormEdit.value.selectedstateDropdown!='Select State') {
      if (isValid == true ) {
     
      var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();
  
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      
      const body = {
        "_id":this.customerRowData._id,
        "name": this.myFormEdit.value.name,
        "pan_no": this.myFormEdit.value.pan_no,
        "gstin": this.myFormEdit.value.gstin,
        "city":this.myFormEdit.value.city,
        "email":this.myFormEdit.value.email,
        "address":this.myFormEdit.value.address,
        "state":this.myFormEdit.value.selectedstateDropdown,
        "contact":this.myFormEdit.value.contact
      };
      
      this.url = "http://localhost:3000/api/customer/update";
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.submittedEdit=false;
          // this.hsnCodeData.push(body);
          this.custList[this.rowDataIndex]=body;
          alert(response.json().message);
        },
        error => {
          // this.closeEditModal();
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  CSV2JSON(csv) {
    var array = this.CSVToArray(csv, ",");

    var objArray = [];
    for (var i = 1; i < array.length; i++) {
      objArray[i - 1] = {};
      for (var k = 0; k < array[0].length && k < array[i].length; k++) {
        var key = array[0][k];
        objArray[i - 1][key] = array[i][k]
      }
    }

    var json = JSON.stringify(objArray.splice(0,objArray.length-1));
    var str = json.replace(/},/g, "},\r\n");
    return str;
  }

  CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
      // Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[1];
      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
        // Since we have reached a new row of data,
        // add an empty row to our data array.
        arrData.push([]);
      }
      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[2]) {
        // We found a quoted value. When we capture
        // this value, unescape any double quotes.
        var strMatchedValue = arrMatches[2].replace(
          new RegExp("\"\"", "g"), "\"");
      } else {
        // We found a non-quoted value.
        var strMatchedValue = arrMatches[3];
      }
      // Now that we have our value string, let's add
      // it to the data array.
      arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
  }

  uploadCsvFileToServer(jsonString) {
    var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });
    const body = {
      "data": JSON.parse(jsonString)
    };

    

    console.log(body);
    this.url = "http://localhost:3000/api/customer/uploadFile";
    return this.http.post(this.url, body, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeModal();
        
        alert(response.json().message);
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
      }
      );
  }

  onCSVFilePicked(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      console.log(file.name);
      console.log(file.size);
      console.log(file.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result;
        console.log(csv);
        var csvString = this.CSV2JSON(csv);
        // var csvString=this.CSV2JSON(csv);

        this.uploadCsvFileToServer(csvString);
      }
    }
  }
}
