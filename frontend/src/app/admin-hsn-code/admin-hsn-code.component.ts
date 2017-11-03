import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-admin-hsn-code',
  templateUrl: './admin-hsn-code.component.html',
  styleUrls: ['./admin-hsn-code.component.css']
})
export class AdminHsnCodeComponent implements OnInit {

  public addStateForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submitted_edit: boolean;
  public events: any[] = []; // use later to display form changes
  hsnCodeData = Array();
  hsnRowData;
  hsnCodeSubmitData = {};
  modelHide = '';
  myForm;
  public selectedStatusType;
  url = "";
  selectedStatusTypeDrop;
  myForm_edit;
  public hsn_code_status = "0";
  public statusDropDown = Array();
  rowIndexToModify;

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;

  constructor(private http: Http) {
    this.statusDropDown.push({ "code": 0, "desc": "Approved" });
    this.statusDropDown.push({ "code": 1, "desc": "Pending" });
    this.statusDropDown.push({ "code": 2, "desc": "Declined" });
    this.selectedStatusType = "Select Status";
    console.log("selectedStatusTypeCONSOLE", this.selectedStatusType);
    this.getAllHSNCodeList();
  }

  ngOnInit() {
    // we will initialize our form model here
    this.myForm = new FormGroup({
      hsn_code: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      rate: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      selectedStatusType: new FormControl('Select Status'),
      description: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)])
      // address: new FormGroup({
      //   street: new FormControl('', <any>Validators.required),
      //   postcode: new FormControl('8000')
      // })
    });

    this.myForm_edit = new FormGroup({
      hsn_code_edit: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      rate_edit: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      selectedStatusType_edit: new FormControl('Select Status'),
      description_edit: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)])
    })
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  private closeEditModal() {
    this.closeBtn2.nativeElement.click();
  }

  onStatusSelect(data) {
    console.log("LOG_ON_STATUS_SELECT", data);
  }

  getAllHSNCodeList() {
    console.log("getALLHSNCODELIST");
    var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";

    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('x-access-token', access_token);
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    // headers.append('Accept','charset=utf-8');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/hsn/index?limit=17&page=1&sortBy=title&search=', options)
      .subscribe(
      response => {
        console.log("BRANCH_LIST_API_RESPONSE", response.json());
        console.log("BRANCH_LIST_API_RESPONSE_2", response.json().docs);
        for (let data of response.json().docs) {
          this.hsnCodeData.push(data);
        }
      },
      error => {
        alert(error.text());
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

  uploadCsvFileToServer(jsonString) {
    var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });
    const body = {
      "data": JSON.parse(jsonString)
    };

    this.url = "http://localhost:3000/api/hsn/uploadFile";
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

  save(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    var temp = this.statusDropDown.filter(x => x.desc === this.myForm.value.selectedStatusType);
    console.log("CONSOLEEEEE", temp);

    console.log("CONSOLE", temp[0].code);
    this.hsnCodeSubmitData = this.myForm.value;

    console.log("form valuse", this.hsnCodeSubmitData);

    if (isValid == true && this.myForm.value.selectedStatusType != 'Select Status') {

      var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "code": this.myForm.value.hsn_code,
        "rate": this.myForm.value.rate,
        "status": temp[0].code,
        "description": this.myForm.value.description,
        "statusDesc": this.myForm.value.selectedStatusType,
        "_id": "59f8474e492dd225ec4b7f43"
      };

      this.url = "http://localhost:3000/api/hsn/create";
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();

          // this.hsnCodeData.push(body);
          alert(response.json().message);
          this.hsnCodeData.pop();
          this.getAllHSNCodeList();
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  update(isValid: boolean) {
    console.log("HIIII");
    this.submitted_edit = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    var temp = this.statusDropDown.filter(x => x.desc === this.myForm_edit.value.selectedStatusType_edit);
    console.log("CONSOLEEEEE", temp);

    console.log("CONSOLE", temp[0].code);
    this.hsnCodeSubmitData = this.myForm_edit.value;
    console.log("form valuse", this.hsnCodeSubmitData);

    if (isValid == true && temp) {
      // if (isValid == true) {
      var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      console.log("_ID___", this.hsnRowData._id);
      const body = {
        "code": this.myForm_edit.value.hsn_code_edit,
        "rate": this.myForm_edit.value.rate_edit,
        "status": temp[0].code,
        "description": this.myForm_edit.value.description_edit,
        // "statusDesc":this.myForm_edit.value.selectedStatusType_edit,
        "_id": this.hsnRowData._id
      };

      this.url = "http://localhost:3000/api/hsn/update";
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          // console.log("suceessfull data", response);
          this.closeEditModal();
          this.submitted_edit = false;
          // this.hsnCodeData.push(body);
          // this.hsnCodeData.findIndex()
          this.hsnCodeData[this.rowIndexToModify] = body;
          alert(response);
          // this.getAllHSNCodeList();
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  editHSNRecord(data, indexVal) {
    this.rowIndexToModify = indexVal;
    console.log("indexVal", indexVal);
    console.log("VALUEATINDEX", this.hsnCodeData.indexOf(indexVal));
    console.log("data.selectedStatusType", data.selectedStatusType);
    var temp;
    console
    if (data.status) {
      console.log("GET_STATUS", data.status);
      temp = this.statusDropDown.filter(x => x.code == data.status);
      console.log("selectedStatusTypeDrop", temp[0].desc);
      this.myForm_edit.get("rate_edit").setValue(data.rate);
      this.myForm_edit.get("hsn_code_edit").setValue(data.code);
      this.myForm_edit.get("description_edit").setValue(data.description);

      this.myForm_edit.get("selectedStatusType_edit").setValue(temp[0].desc);
    }

    this.hsnRowData = data;
    // this.selectedStatusTypeDrop=temp[0].desc;
    if (temp[0].desc) {
      this.selectedStatusTypeDrop = temp[0].desc;
    }
    else {
      this.selectedStatusTypeDrop = "Select Status";
    }
  }

  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  }

  deleteHSNRecord(item) {
    this.hsnRowData = item;
    var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });
    console.log("_ID___", this.hsnRowData._id);
    const body = {

      "_id": this.hsnRowData._id
    };
    // requestOptions.params.set("_id",this.hsnRowData._id);
    this.url = "http://localhost:3000/api/hsn/delete?_id=" + this.hsnRowData._id;
    return this.http.delete(this.url, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeModal();

        // this.hsnCodeData.push(body);
        alert(response.json().message);
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
      }
      );
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

    var json = JSON.stringify(objArray);
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
}
