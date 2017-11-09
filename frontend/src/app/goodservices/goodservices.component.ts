import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ApiserviceService } from '../apiservice.service';
import { ExcelServiceService } from '../excel-service.service';
import * as _ from 'underscore';
import { PagerService } from '../service/pager.service';

@Component({
  selector: 'app-goodservices',
  templateUrl: './goodservices.component.html',
  styleUrls: ['./goodservices.component.css'],
  providers: [PagerService,ExcelServiceService]
})
export class GoodservicesComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;

  url;
  goodsAndServicesDataList = [];
  rowDataIndex;
  myFormEdit: FormGroup;
  goodsAndServicesRowData;
  addNewGoodsForm: FormGroup;
  goodsAndServicesFormData;
  submitted: boolean = false;
  editSubmitted: boolean = false;
  pager: any = {};

  // paged items
  pagedItems: any[];
  access_token;

  constructor(public http: Http, public excelServiceService: ExcelServiceService, public pagerService: PagerService) {
    this.access_token = localStorage.getItem("user_token");
    console.log("user_token", this.access_token);
    this.pager.currentPage = 1;
    this.getGoodsAndServicesList(1);
  }

  ngOnInit() {
    this.addNewGoodsForm = new FormGroup({
      description: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      hsn_code: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      unit: new FormControl('Select Unit'),
      rate: new FormControl('Select Rate')
    });

    this.myFormEdit = new FormGroup({
      descriptionEdit: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      hsn_code_edit: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
      unitEdit: new FormControl('Select Unit'),
      rateEdit: new FormControl('Select Rate')
    });
  }

  getGoodsAndServicesList(page: number) {
    this.pager.currentPage = page;
    console.log("getALLHSNCODELIST");

    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    // myHeaders.append('x-access-token', access_token);
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    // headers.append('Accept','charset=utf-8');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/goods/index?token=' + this.access_token + '&limit=5' + '&page=' + this.pager.currentPage, options)
      .subscribe(
      response => {
        console.log("BRANCH_LIST_API_RESPONSE", response.json());
        this.goodsAndServicesDataList = response.json().docs;
        this.pager.pageSize = response.json().limit;
        this.pager.totalItems = response.json().total;
        this.setPage();
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );
  }

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.goodsAndServicesDataList;
  }

  editGoodsServicesRecord(data) {
    this.rowDataIndex = data._id;
    var temp;
    if (data) {
      console.log("DATA", data);

      this.myFormEdit.get("descriptionEdit").setValue(data.description);
      this.myFormEdit.get("hsn_code_edit").setValue(data.hsn_code);
      this.myFormEdit.get("unitEdit").setValue(data.unit);
      this.myFormEdit.get("rateEdit").setValue(data.rate);
    }
    this.goodsAndServicesRowData = data;
  }

  updateGoodsAndServicesRecord(isValid: boolean) {

    console.log("EDIITITITT");
    this.editSubmitted = true; // set form submit to true
    console.log(isValid);

    // if (isValid == true && this.myFormEdit.value.selectedstateDropdown!='Select State') {
    if (isValid == true) {

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });

      const body = {
        "_id": this.goodsAndServicesRowData._id,
        "description": this.myFormEdit.value.descriptionEdit,
        "hsn_code": this.myFormEdit.value.hsn_code_edit,
        "unit": this.myFormEdit.value.unitEdit,
        "rate": this.myFormEdit.value.rateEdit
      };

      this.url = "http://localhost:3000/api/goods/update?token=" + this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.editSubmitted = false;
          // this.hsnCodeData.push(body);
          alert(response.json().message);
          // this.goodsAndServicesDataList[this.rowDataIndex]=body;
          this.getGoodsAndServicesList(this.pager.currentPage);
        },
        error => {
          // this.closeEditModal();
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  saveGoodsAndServices(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    console.log("form val", this.addNewGoodsForm.value.name);
    this.goodsAndServicesFormData = this.addNewGoodsForm.value;
    console.log("form valuse", this.goodsAndServicesFormData);

    if (isValid == true) {

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "description": this.addNewGoodsForm.value.description,
        "hsn_code": this.addNewGoodsForm.value.hsn_code,
        "unit": this.addNewGoodsForm.value.unit,
        "rate": this.addNewGoodsForm.value.rate
      };
      this.url = "http://localhost:3000/api/goods/create?token=" + this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          alert(response.json().message);
          this.getGoodsAndServicesList(this.pager.currentPage);
          this.submitted = false;
          this.addNewGoodsForm.reset();
          this.addNewGoodsForm.get("unit").setValue("Select Unit");
          this.addNewGoodsForm.get("rate").setValue("Select Rate");
        },
        error => {
          alert(error.message);
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  closeModal() {
    this.closeBtn.nativeElement.click();
  }

  closeEditModal() {
    this.closeBtn2.nativeElement.click();
  }

  closeDeleteModal() {
    this.closeBtn3.nativeElement.click();
  }

  recordToDelete(item) {
    this.goodsAndServicesRowData = item;
  }

  deleteRecord() {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });

    this.url = "http://localhost:3000/api/goods/delete/" + this.goodsAndServicesRowData._id;
    return this.http.delete(this.url, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeDeleteModal();
        alert(response.json().message);
        this.getGoodsAndServicesList(this.pager.currentPage);
      },
      error => {
        alert(error.message);
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

        // this.uploadCsvFileToServer(csvString);
      }
    }
  }

  uploadCsvFileToServer(jsonString) {

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });
    const body = {
      "data": JSON.parse(jsonString)
    };



    console.log(body);
    this.url = "http://localhost:3000/api/goods/uploadFile?token=" + this.access_token;
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

  downloadJSONTOCSV() {
    this.getGoodsAndServicesList(this.pager.currentPage);
    this.excelServiceService.exportAsExcelFile(this.goodsAndServicesDataList, "BranchesJSNTOCSV");
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

    var json = JSON.stringify(objArray.splice(0, objArray.length - 1));
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
