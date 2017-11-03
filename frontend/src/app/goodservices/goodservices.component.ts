import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-goodservices',
  templateUrl: './goodservices.component.html',
  styleUrls: ['./goodservices.component.css']
})
export class GoodservicesComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  // @ViewChild('closeBtn2') closeBtn2: ElementRef;
  url;
  goodsAndServicesDataList=[];
  rowDataIndex;
  addNewGoodsFormEdit;
  goodsAndServicesRowData;
  addNewGoodsForm;
  goodsAndServicesFormData;
  submitted;
  constructor(public http:Http) { }

  ngOnInit() {
    this.addNewGoodsForm = new FormGroup({
      description: new FormControl('', [<any>Validators.required]),
      hsn_code: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      unit: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      rate: new FormControl('', [<any>Validators.required])
    });

    this.addNewGoodsFormEdit=new FormGroup({
      description: new FormControl('', [<any>Validators.required]),
      hsn_code: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      unit: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      rate: new FormControl('', [<any>Validators.required])
    });

    this.getGoodsAndServicesList();
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
        // this.closeModal();
        
        alert(response.json().message);
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
      }
      );
  }

  getGoodsAndServicesList() {
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

    this.http.get('http://localhost:3000/api/goods/list', options)
      .subscribe(
      response => {
        console.log("BRANCH_LIST_API_RESPONSE", response.json());
        console.log("BRANCH_LIST_API_RESPONSE_2", response.json().goods);
        // for (let data of response.json().goods) {
        //   this.goodsAndServicesDataList.push(data);
        // }
        this.goodsAndServicesDataList=response.json().goods;
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );
  }

  editGoodsServicesRecord(data)
  {
    this.rowDataIndex=data._id;
    var temp;
    if(data)
    {
      console.log("DATA",data);
      
      this.addNewGoodsFormEdit.get("description").setValue(data.description);
      this.addNewGoodsFormEdit.get("hsn_code").setValue(data.hsn_code);
      this.addNewGoodsFormEdit.get("unit").setValue(data.unit);
      this.addNewGoodsFormEdit.get("rate").setValue(data.rate);
      // this.addNewGoodsFormEdit.get("state").setValue(data.state);
    }
    this.goodsAndServicesRowData=data;
  }

  // updateGoodsAndServicesRecord(isValid: boolean)
  // {
  //   this.submittedEdit = true; // set form submit to true
  //   console.log(isValid);
  //   console.log("hi form module is called from page");
  
  //   // if (isValid == true && this.addNewGoodsFormEdit.value.selectedstateDropdown!='Select State') {
  //     if (isValid == true ) {
     
  //     var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
  //     const headers = new Headers();
  
  //     headers.append('Content-Type', 'application/json');
  //     headers.append('x-access-token', access_token);
  //     const requestOptions = new RequestOptions({ headers: headers });
      
  //     const body = {
  //       "_id":this.customerRowData._id,
  //       "name": this.addNewGoodsFormEdit.value.name,
  //       "pan_no": this.addNewGoodsFormEdit.value.pan_no,
  //       "gstin": this.addNewGoodsFormEdit.value.gstin,
  //       "city":this.addNewGoodsFormEdit.value.city,
  //       "email":this.addNewGoodsFormEdit.value.email,
  //       "address":this.addNewGoodsFormEdit.value.address,
  //       "state":this.addNewGoodsFormEdit.value.selectedstateDropdown,
  //       "contact":this.addNewGoodsFormEdit.value.contact
  //     };
      
  //     this.url = "http://localhost:3000/api/customer/update";
  //     return this.http.put(this.url, body, requestOptions)
  //       .subscribe(
  //       response => {
  //         console.log("suceessfull data", response.json().message);
  //         this.closeEditModal();
  //         this.submittedEdit=false;
  //         // this.hsnCodeData.push(body);
  //         this.custList[this.rowDataIndex]=body;
  //         alert(response.json().message);
  //       },
  //       error => {
  //         // this.closeEditModal();
  //         console.log("error", error.message);
  //         console.log(error.text());
  //       }
  //       );
  //   }
  // }

  saveGoodsAndServices(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    console.log("form val", this.addNewGoodsForm.value.name);
    this.goodsAndServicesFormData = this.addNewGoodsForm.value;
    console.log("form valuse", this.goodsAndServicesFormData);

    if (isValid == true) {

      var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "description": this.addNewGoodsForm.value.description,
        "hsn_code": this.addNewGoodsForm.value.hsn_code,
        "unit": this.addNewGoodsForm.value.unit,
        "rate": this.addNewGoodsForm.value.rate
      };
      this.url = "http://localhost:3000/api/goods/create";
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          alert(response.json().message);
          this.getGoodsAndServicesList();
        },
        error => {
          alert(error.message);
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  closeModal()
  {
    this.closeBtn.nativeElement.click();
  }

  // closeEditModal()
  // {
  //   this.closeBtn2.nativeElement.click();
  // }

}
