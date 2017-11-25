import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ApiserviceService } from '../apiservice.service';
import { ExcelServiceService } from '../excel-service.service';
import { RouterModule, Routes, Router } from '@angular/router';
import * as _ from 'underscore';
import { PagerService } from '../service/pager.service';

@Component({
  selector: 'app-goodservices',
  templateUrl: './goodservices.component.html',
  styleUrls: ['./goodservices.component.css'],
  providers: [PagerService, ExcelServiceService, ApiserviceService]
})
export class GoodservicesComponent implements OnInit {

  @ViewChild('closeCsv') closeCsv: ElementRef;
  @ViewChild('closeChoose') closeChoose: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeEditModal') closeEditModal: ElementRef;
  @ViewChild('clearInputFile') clearInputFile: ElementRef;

  errorMsg:string;
  filename;
  isDownloadSuccessful: boolean;
  headers: Headers;
  branchesList = [];
  isEditingClicked: boolean;
  publicBranchData;
  selectedDealerStateEdit = '0';
  selectedDealerStateNew = '0';
  jsonString: string;

  rowDataIndex;
  GoodsRowData;
  public addStateForm: FormGroup; // our model driven form
  public isGoodsList: boolean; // keep track on whether form is submitted
  public submitted: boolean = false; // keep track on whether form is submitted
  public editSubmitted: boolean = false; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  public ifSuccess: number = 0;
  goodsData = Array();
  url = "";
  pager: any = {};
  Paging = {
    page: 1,
    limit: 2
  };
  pageSize: number;
  currentPage: number;
  goodsForm: FormGroup;
  goodsFormEdit: FormGroup;
  sortBy = "created_at";
  access_token = "";
  servicesPager: any = {};
  pagedItems: any = [];
  rateList = [];
  unitList = [];
  typeList = [];

  constructor(private http: Http, private pagerService: PagerService, public excelServiceService: ExcelServiceService, private router: Router, public apiserviceService: ApiserviceService) {
    this.access_token = localStorage.getItem("user_token");
    console.log("user_token", this.access_token);
    this.getGoodService(1);
  }

  ngOnInit() {
    this.rateList = [
      { "id": 1, "name": "0.1%" },
      { "id": 2, "name": "0.2%" },
      { "id": 3, "name": "3%" },
      { "id": 4, "name": "5%" },
      { "id": 5, "name": "12%" },
      { "id": 6, "name": "18%" },
      { "id": 7, "name": "28%" },
    ];
    this.unitList =[
      'SELECT',
      'CAN-CANS',
      'CBM-CUBIC',
      'METERS',
      'CCM-CUBIC',
      'CENTIMETERS',
      'CMS-CENTIMETERS',
      'CTN-CARTONS',
      'DOZ-DOZENS',
      'DRM-DRUMS',
      'GGK-GREAT',
      'GROSS',
      'GMS-GRAMMES',
      'GRS-GROSS',
      'GYD-GROSS',
      'YARDS',
      'KGS-KILOGRAMS',
      'KLR-KILOLITRE',
      'KME-KILOMETRE',
      'MLT-MILILITRE',
      'MTR-METERS',
      'MTS-METRIC',
      'TON',
      'NOS-NUMBERS',
      'PAC-PACKS',
      'PCS-PIECES',
      'PRS-PAIRS',
      'QTL-QUINTAL',
      'ROL-ROLLS',
      'SET-SETS',
      'SQF-SQUARE',
      'FEET',
      'SQM-SQUARE',
      'METERS',
      'SQY-SQUARE',
      'YARDS',
      'TBS-TABLETS',
      'TGM-TEN',
      'GROSS',
      'THD-THOUSANDS',
      'TON-TONNES',
      'TUB-TUBES',
      'UGS-US',
      'GALLONS',
      'UNT-UNITS',
      'YDS-YARDS',
      'OTH-OTHERS'
    ];

    this.typeList = [
      { "id": 1, "name": "Goods" },
      { "id": 2, "name": "Services" }
    ];
    console.log("rateList", this.rateList);
    this.goodsForm = new FormGroup({
      description: new FormControl('', [<any>Validators.required, <any>Validators.maxLength(9)]),
      hsn_code: new FormControl('', [<any>Validators.required, <any>Validators.maxLength(9)]),
      unit: new FormControl(''),
      rate: new FormControl(''),
      type: new FormControl('')
    });

    this.goodsFormEdit = new FormGroup({
      description: new FormControl('', [<any>Validators.required, <any>Validators.maxLength(9)]),
      hsn_code: new FormControl('', [<any>Validators.required, <any>Validators.maxLength(9)]),
      unit: new FormControl(''),
      rate: new FormControl(''),
      type: new FormControl('')
    });


  }



  getGoodService(page: number) {
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: myHeaders });
    this.http.get(this.apiserviceService.BASE_URL + 'goodsuser/index?token=' + this.access_token + '&limit=10&page=' + this.pager.currentPage, options)
      .subscribe(
      response => {
        console.log("googservice list", response.json().docs);
        this.goodsData = response.json().docs;
        let isList = this.goodsData.length;
        this.pager.pageSize = response.json().limit;
        this.pageSize = this.Paging.limit;
        this.currentPage = this.Paging.page;
        if (isList === 0) {
          this.isGoodsList = true;
          // console.log("")
        } else {
          this.isGoodsList = false;
        }

      },
      error => {
        // alert(error.text());
        console.log(error.text());
      }
      );
  }

  saveGoodUser(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("form val", this.goodsForm.value);

    if (isValid == true) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', this.access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "description": this.goodsForm.value.description,
        "hsn_code": this.goodsForm.value.hsn_code,
        "unit": this.goodsForm.value.unit,
        "rate": this.goodsForm.value.rate,
        "type": this.goodsForm.value.type
      };

      this.url = this.apiserviceService.BASE_URL + "goodsuser/create?token=" + this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeBtn.nativeElement.click();
          // this.custList.push(body);
          // alert(response.json().message);
          this.goodsForm.reset();
          // this.myForm.get("selectedstateDropdown").setValue("Select State");
          this.submitted = false;
          this.getGoodService(this.pager.currentPage);
        },
        error => {
          // alert(error.message);
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.goodsData;
  }

  editGoodsServicesRecord(data) {
    this.rowDataIndex = data._id;
    var temp;
    if (data) {
      console.log("DATA", data);

      this.goodsFormEdit.get("description").setValue(data.description);
      this.goodsFormEdit.get("hsn_code").setValue(data.hsn_code);
      this.goodsFormEdit.get("unit").setValue(data.unit);
      this.goodsFormEdit.get("rate").setValue(data.rate);
      this.goodsFormEdit.get("type").setValue(data.type);
    }

    this.GoodsRowData = data;

  }

  updateGoodUser(isValid: boolean) {
    this.editSubmitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    console.log("edited form data", this.goodsFormEdit.value);
    if (isValid == true) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "_id": this.GoodsRowData._id,
        "description": this.goodsFormEdit.value.description,
        "hsn_code": this.goodsFormEdit.value.hsn_code,
        "unit": this.goodsFormEdit.value.unit,
        "rate": this.goodsFormEdit.value.rate,
        "type": this.goodsFormEdit.value.type
      };
      console.log("body", body);

      this.url = this.apiserviceService.BASE_URL + "vendor/update?token=" + this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal.nativeElement.click();
          this.editSubmitted = false;
          this.getGoodService(this.pager.currentPage);
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
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
      'data': JSON.parse(this.jsonString)
    };

    console.log('CSV_DATA', body);

    this.url = this.apiserviceService.BASE_URL + 'branch/uploadFile?token=' + this.access_token;

    return this.http.post(this.url, body, requestOptions)
      .subscribe(
      response => {
        console.log('suceessfull data', response.json().message);
        var errorval;

        if (response.json().error) {
          this.ifSuccess = 1;
          errorval = response.json().error;
          if (errorval.substr(56, 9) === 'contact_1') {
            this.errorMsg = 'Contact No is already registered !';
          } else if (errorval.substr(56, 8) === 'pan_no_1') {
            this.errorMsg = 'Pan No is already registered !';
          } else {
            this.errorMsg = 'Email id is already registered !';
          }
        }
        else {
          this.errorMsg = "";
          // this.closeModal();
          this.closeCsv.nativeElement.click();
          this.closeChoose.nativeElement.click();
          this.clearInputFile.nativeElement.value = "";
          this.ifSuccess = -1;
          this.getGoodService(this.pager.currentPage);
        }
      },
      error => {
        this.ifSuccess = -1;
        console.log('error', error.message);
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

    this.http.get(this.apiserviceService.BASE_URL + 'branch/index?token=' + this.access_token, options)
      .subscribe(
      response => {
        exportedList = response.json().docs;
        this.excelServiceService.exportAsExcelFile(exportedList, String(this.excelServiceService.getCurrentDateAndTime()));
        this.isDownloadSuccessful = true;
      },
      error => {
        // alert(error.text());
        console.log(error.text());
      }
      );
  }

  closeDownloadModal() {
    this.isDownloadSuccessful = false;
  }

  resetForm() {
    this.goodsForm.reset();
  }

  clearCSVForm() {
    this.clearInputFile.nativeElement.value = "";
    this.ifSuccess = 0;
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

}
