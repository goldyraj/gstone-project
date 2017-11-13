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
  isDownloadSuccessful:boolean;
  ifSuccess:boolean;
  @ViewChild('closeChoose') closeChoose: ElementRef;
  @ViewChild('closeCsv') closeCsv:ElementRef;
  jsonString;

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
        var csvString = this.excelServiceService.CSV2JSON(csv);
        this.jsonString = csvString;
        // var csvString=this.CSV2JSON(csv);
        // this.uploadCsvFileToServer(csvString);
      }
    }
  }

  uploadCsvFileToServer() {

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', this.access_token);
    const requestOptions = new RequestOptions({ headers: headers });
    const body = {
      "data": JSON.parse(this.jsonString)
    };

    console.log("CSV_DATA", body);

    this.url = "http://localhost:3000/api/goods/uploadFile?token=" + this.access_token;

    return this.http.post(this.url, body, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeModal();
        this.closeCsv.nativeElement.click();
        this.closeChoose.nativeElement.click();
        this.ifSuccess = true;
        this.getGoodsAndServicesList(this.pager.currentPage);
        // alert(response.json().message);
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
      }
      );
  }

  downloadJSONTOCSV() {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    var exportedList;
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');

    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/goods/index?token='+this.access_token, options)
      .subscribe(
      response => {
        exportedList = response.json().docs;
        this.excelServiceService.exportAsExcelFile(exportedList,String(this.excelServiceService.getCurrentDateAndTime()));
        this.isDownloadSuccessful=true;
      },
      error => {
        // alert(error.text());
        console.log(error.text());
      }
      );
  }

  closeDownloadModal()
  {
    this.isDownloadSuccessful=false;
  }

  resetForm()
  {
    this.addNewGoodsForm.reset();
  }

}
