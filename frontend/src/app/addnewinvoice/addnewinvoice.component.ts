import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as _ from 'underscore';
import { PagerService } from '../service/pager.service';
import { ExcelServiceService } from '../excel-service.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { NumberValidatorsService } from "../number-validators.service";
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-addnewinvoice',
  templateUrl: './addnewinvoice.component.html',
  styleUrls: ['./addnewinvoice.component.css'],
  providers:[ApiserviceService]
})
export class AddnewinvoiceComponent implements OnInit {
  reimburshForm: FormGroup;
  salesListArray: FormArray;
  // public addTableForm: FormGroup;
  // public addInvoiceForm: FormGroup;
  public selectedAll: boolean;

  access_token: string;
  selectedName: string;
  customersNamesList = [];
  filteredList = [];
  query: string;
  // invoiceTypeRadioForm: FormGroup;
  customerDetailsList = [];
  userGstin = "ABCDE123R";
  grandTotal: number = 1000000;
  stateList = [];
  selectedCustomerData: any;
  disableEcommerceInput: boolean = false;
  invoiceDynList = [];


  serice = [
    'SELECT',
    'GOODS',
    'SERVICES'
  ]

  rate = [
    'SELECT',
    '0%',
    '0.25%',
    '3%',
    '5%',
    '12%',
    '18%',
    '28%'
  ]

  unit = [
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
  ]
  constructor(private formBuilder: FormBuilder, private pagerService: PagerService, private router: Router, public http: Http,public apiserviceService: ApiserviceService ) {
    
  }

  ngOnInit() {
    this.access_token = localStorage.getItem('user_token');
    this.buildForm();
    this.getCustomerNames();
    this.getStateList();
  }

  buildForm() {
    this.reimburshForm = this.formBuilder.group({
      name: this.formBuilder.control(null),
      invoiceNo: this.formBuilder.control({ value: null, disabled: true }),
      date: this.formBuilder.control(null),
      gstin: this.formBuilder.control(null),
      pos: this.formBuilder.control('0'),
      eComGstin: this.formBuilder.control(null),
      salesPerson: this.formBuilder.control(null),
      invoiceTypeRadio: this.formBuilder.control(null),
      salesList: this.formBuilder.array([
        this.formBuilder.group({
          description: this.formBuilder.control(null),
          goodservice: this.formBuilder.control(null),
          hsn: this.formBuilder.control(null),
          qty: this.formBuilder.control(null),
          uom: this.formBuilder.control(null),
          tax: this.formBuilder.control(null),
          rtax: this.formBuilder.control(null),
          sgst: this.formBuilder.control(null),
          igst: this.formBuilder.control(null),
          val1: this.formBuilder.control(null),
          val2: this.formBuilder.control(null),
          val3: this.formBuilder.control(null),
          val4: this.formBuilder.control(null),
          val5: this.formBuilder.control(null),
        }),
      ]),

    });

    this.salesListArray = this.reimburshForm.get('salesList') as FormArray;
    console.log("submit  val", this.salesListArray);
  }

  submitForm(value) {
    console.log(value);
  }

  addSalesListItem() {
    let formGroup: FormGroup = this.formBuilder.group({
      description: this.formBuilder.control(null),
      goodservice: this.formBuilder.control(null),
      hsn: this.formBuilder.control(null),
      qty: this.formBuilder.control(null),
      uom: this.formBuilder.control(null),
      tax: this.formBuilder.control(null),
      rtax: this.formBuilder.control(null),
      sgst: this.formBuilder.control(null),
      igst: this.formBuilder.control(null),
      val1: this.formBuilder.control(null),
      val2: this.formBuilder.control(null),
      val3: this.formBuilder.control(null),
      val4: this.formBuilder.control(null),
      val5: this.formBuilder.control(null),
    });

    this.salesListArray.push(formGroup);
    console.log("added val", this.salesListArray);
  }

  deleteRow(index: number) {
    const control = <FormArray>this.reimburshForm.controls['salesList'];
    // remove the chosen row
    control.removeAt(index);

  }

  getCustomerNames() {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get(this.apiserviceService.BASE_URL+'customer/index?token=' + this.access_token + '&limit=' + 5000, options)
      .subscribe(
      response => {
        // this.customersNamesList = response.json().docs;
        console.log("RESPONSE", response.json().docs);
        this.customerDetailsList = response.json().docs;
        for (let data of response.json().docs) {
          console.log("NAMES", data.name);
          this.customersNamesList.push(data.name);
          console.log("CUSTOMER_NAMES", this.customersNamesList);
        }
      },
      error => {
        // alert(error.text());
        console.log(error.text());
      }
      );
  }




  search() {
    console.log("serarch called");
    if (this.query !== "") {

      this.filteredList = this.customersNamesList.filter(function (el) {
        return el.toString().toLowerCase().indexOf(this.query.toString().toLowerCase()) > -1;
      }.bind(this));
      console.log("filteredList", this.filteredList);
    } else {
      this.filteredList = [];
    }
  }

  select(item) {
    this.query = item;
    this.filteredList = [];
    this.selectedCustomerData = this.customerDetailsList.filter(x => x.name == item);
    console.log("NAME", this.selectedCustomerData);
    console.log("GSTIN", this.selectedCustomerData.gstin);
    this.reimburshForm.get('gstin').setValue(this.selectedCustomerData[0].gstin);
  }

  selectRadio() {
    if (this.reimburshForm.controls.invoiceTypeRadio.value === "E_Commerce") {
      this.disableEcommerceInput = true;
    }
    else {
      this.disableEcommerceInput = false;
    }
    console.log("CLICKEED", this.disableEcommerceInput);
  }

  // addInvoice(form: FormGroup) {
  //   let response: any;
  //   let myHeaders = new Headers({ 'Content-Type': 'application/json' });
  //   myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
  //   myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
  //   myHeaders.append('Access-Control-Allow-Origin', '*');
  //   myHeaders.append('Access-Control-Allow-Credentials', 'true');

  //   let options = new RequestOptions({ headers: myHeaders });

  //   const body = {
  //     "gstin": this.userGstin,
  //     "fp": this.customerDetailsForm.controls.date.value,
  //     "gt": this.customerDetailsForm.controls.gstin.value,
  //     "cur_gt": this.customerDetailsForm.controls.gstin.value,
  //     "inum": this.customerDetailsForm.controls.invoiceNo.value,
  //     "b2b": [
  //       {
  //         "ctin": this.customerDetailsForm.controls.gstin.value,
  //         "inv": [
  //           {
  //             "inum": this.customerDetailsForm.controls.invoiceNo.value,
  //             "idt": this.customerDetailsForm.controls.date.value,
  //             "val": this.grandTotal,
  //             "pos": this.customerDetailsForm.controls.pos,
  //             "rchrg": "N",
  //             "etin": this.customerDetailsForm.controls.gstin,
  //             "inv_typ": "R",
  //             "itms": [
  //               {
  //                 "num": 1,
  //                 "itm_det": {
  //                   "rt": 5,
  //                   "txval": 10000,
  //                   "iamt": 833.33,
  //                   "csamt": 500
  //                 }
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   };

  //   console.log("BODY", body);

  //   this.http.post('http://localhost:3000/api/invoice/create?token=' + this.access_token, body, options)
  //     .subscribe(
  //     response => {
  //       console.log("RESPONSE", response);
  //       // this.customerDetailsList = response.json().docs;
  //       // for (let data of response.json().docs) {
  //       //   this.customersNamesList.push(data.name);
  //       //   console.log("CUSTOMER_NAMES", this.customersNamesList);
  //       // }


  //     },
  //     error => {
  //       console.log(error);
  //       if (error.text() == "Invoice Number Allready exists") {

  //       }
  //     }
  //     );
  // }

  getStateList() {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get(this.apiserviceService.BASE_URL+'state/list?token=' + this.access_token + '&limit=' + 1000, options)
      .subscribe(
      response => {
        this.stateList = response.json().state;
      },
      error => {
        console.log(error.text());
      }
      );
  }

  changeInd($event, i, control) {
    console.log("INPUTCHANGED", $event.target.value, " - ", i, "-", control);
    console.log("EVENT", $event);
    var controlArray = ['description', 'hsn'];
    // for (var j = 0; j < controlArray.length; j++) {
    //   if (control === controlArray[j]) {
    //     console.log("CONTROLARRAY",controlArray[j]);
    //     this.invoiceDynList[i].hsn = $event.target.value;
    //     console.log("CONTROL", this.invoiceDynList[i].control);
    //     console.log("pushed array", this.invoiceDynList);
    //   }
    // }
    if (control === "hsn") {
      this.invoiceDynList[i].hsn = $event.target.value;
      console.log("pushed array", this.invoiceDynList);
    }
    else if (control === "description") {
      this.invoiceDynList[i].description = $event.target.value;
    }
    else if (control === "description") {
      this.invoiceDynList[i].description = $event.target.value;
    }
  }
}
