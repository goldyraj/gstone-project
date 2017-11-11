import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ExcelServiceService } from '../excel-service.service';
import { DateTime } from 'date-time-js';
import { PagerService } from '../service/pager.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],
  providers: [ExcelServiceService, PagerService]
})
export class VendorComponent implements OnInit {
  // constructor() { }
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;

  modelHide = '';
  url = "";
  vender = {};
  venderList = [];
  stateList = [];
  rowDataIndex;
  public myForm: FormGroup; // our model driven form
  public myFormEdit: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  public vendorList: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public vendorRowData;
  public csvString;
  access_token;
  pager: any = {};
  pagedItems: any[];
  selectedState = "";
  venderRowData;

  constructor(private _fb: FormBuilder, private http: Http, public excelServiceService: ExcelServiceService, public pagerService: PagerService) {
    this.pager.currentPage = 1;
    this.access_token = localStorage.getItem("user_token");
    this.getVenderList(1);
    console.log("custructor call");
    this.getStateList();

  }

  private checkIfUrlChanged() {
    var dirty = false;

    // window.onbeforeunload = function (e) {
    //     return dirty?
    // };
  }

  ngOnInit() {
    // we will initialize our form model here
    this.myForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      address: new FormControl('', [<any>Validators.required]),
      state: new FormControl('Select State')
    });
    this.myFormEdit = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      address: new FormControl('', [<any>Validators.required]),
      state: new FormControl('Select State')
    });
  }
  onInput($event) {
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
    this.selectedState = $event.target.value;
  }


  saveVender(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("form val", this.myForm.value.name);
    this.vender = this.myForm.value;
    console.log("form valuse", this.vender);

    if (isValid == true) {

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('Access-Control-Expose-Headers', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "name": this.myForm.value.name,
        "gstin": this.myForm.value.gstin,
        "address": this.myForm.value.address,
        "state": this.selectedState
      };
      this.url = "http://localhost:3000/api/vendor/create?token=" + this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          // alert(response.json().message);
          this.getVenderList(this.pager.currentPage);
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

  updateVendorRecord(isValid: boolean) {
    this.submittedEdit = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    console.log("edited form data", this.myFormEdit.value);

    // if (isValid == true && this.myFormEdit.value.selectedstateDropdown!='Select State') {
    if (isValid == true) {

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', this.access_token);
      const requestOptions = new RequestOptions({ headers: headers });

      const body = {
        "_id": this.venderRowData._id,
        "name": this.myFormEdit.value.name,
        "gstin": this.myFormEdit.value.gstin,
        "address": this.myFormEdit.value.address,
        "state": this.selectedState
      };
      console.log("body", body);

      this.url = "http://localhost:3000/api/vendor/update?token=" + this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.submittedEdit = false;
          this.getVenderList(this.pager.currentPage);
          // this.hsnCodeData.push(body);

          this.venderList[this.rowDataIndex] = body;
          // alert(response.json().message);
        },
        error => {
          // this.closeEditModal();
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }


  private closeEditModal(): void {
    this.closeBtn2.nativeElement.click();
  }
  private closeDeleteModal(): void {
    this.closeBtn3.nativeElement.click();
  }

  getStateList() {
    console.log('list called');
    this.http.get('http://localhost:3000/api/state/list').subscribe(data => {
      this.stateList = data.json().state;
      // this.TotalPages = data.json().total;
      // this.pageSize = this.Paging.limit;
      // this.currentPage = this.Paging.page;
      console.log("pagecount", )
      console.log("getStateList", this.stateList);
      // console.log("TotalPages", this.TotalPages);
    });
  }

  getVenderList(page: number) {
    this.pager.currentPage = page;
    this.http.get('http://localhost:3000/api/vendor/index?token=' + this.access_token + '&page=' + this.pager.currentPage + '&limit=' + 5).subscribe(data => {
      this.venderList = data.json().docs;
      let isList = this.venderList.length;
      console.log("verder  PArse", this.venderList);
      console.log("isList", isList);
      this.pager.pageSize = data.json().limit;
      this.pager.totalItems = data.json().total;
      if (isList === 0) {
        this.vendorList = true;
        // console.log("")
      } else {
        this.vendorList = false;
      }
      this.setPage();
    });
  }

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.venderList;
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }


  recordToDelete(item) {
    this.vendorRowData = item;
  }

  editGoodsServicesRecord(data) {
    this.rowDataIndex = data._id;
    var temp;
    if (data) {
      console.log("DATA", data);

      this.myFormEdit.get("name").setValue(data.name);
      this.myFormEdit.get("gstin").setValue(data.gstin);
      this.myFormEdit.get("address").setValue(data.address);
      this.myFormEdit.get("state").setValue(data.state);
    }

    this.venderRowData = data;

  }

  deleteVendorRecord(data) {
    this.rowDataIndex = data._id;
    this.venderRowData = data;
  }

  deleteVendor() {
    console.log("delete api", this.venderRowData._id);
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });

    this.url = "http://localhost:3000/api/vendor/delete/" + this.venderRowData._id;
    return this.http.delete(this.url, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        // this.custList.splice(this.custRowData._id,1);
        this.closeDeleteModal();
        this.getVenderList(this.pager.currentPage);
        this.submittedEdit = false;

        // alert(response.json().message);
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
        this.csvString = this.CSV2JSON(csv);
        // var csvString=this.CSV2JSON(csv);
        // this.uploadCsvFileToServer(csvString);
      }
    }
  }

  uploadCsvFileToServer() {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });
    const body = {
      "data": JSON.parse(this.csvString)
    };

    this.url = "http://localhost:3000/api/vendor/uploadFile?token=" + this.access_token;
    return this.http.post(this.url, body, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json());
        this.closeModal();
        if (response.json().message != null) {
          alert(response.json().message);
          this.getVenderList(this.pager.currentPage);
        }
        else if (response.json().error != null) {
          alert("Your CSV/Excel file contains some repeated data !");
        }
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
        var errorString = error.text();

        if (errorString != null) {
          alert("Your CSV/Excel file contains some repeated data !");
        }
      }
      );
  }

  exportJSONToCSV() {
    // this.excelServiceService.exportAsExcelFile()
  }

  downloadJSONTOCSV() {
    this.getVenderList(this.pager.currentPage);
    this.excelServiceService.exportAsExcelFile(this.venderList, "JSONTOCSV1");
  }

  onUrlChanged() {

  }

}
