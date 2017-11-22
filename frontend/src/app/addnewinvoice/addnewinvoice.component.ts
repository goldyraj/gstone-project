import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as _ from 'underscore';
import { PagerService } from '../service/pager.service';
import { ExcelServiceService } from '../excel-service.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { NumberValidatorsService } from "../number-validators.service";

@Component({
  selector: 'app-addnewinvoice',
  templateUrl: './addnewinvoice.component.html',
  styleUrls: ['./addnewinvoice.component.css']
})
export class AddnewinvoiceComponent implements OnInit {

  access_token: string;
  selectedName: string;
  customersNamesList = [];
  filteredList = [];
  query: string;
  invoiceTypeRadioForm: FormGroup;
  customerDetailsList = [];
  userGstin="ABCDE123R";
  grandTotal:number=1000000;
  stateList=[];

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

  customerDetailsForm: FormGroup;
  selectedCustomerData: any;
  disableEcommerceInput: boolean = false;
  invoiceTypeRadioArray=[];

  constructor(public http: Http, private pagerService: PagerService, private router: Router) {

    this.invoiceTypeRadioForm = new FormGroup({
      invoiceTypeRadio: new FormControl('', [<any>Validators.required]),
    });

    this.customerDetailsForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      invoiceNo: new FormControl('', [<any>Validators.required]),
      date: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      pos: new FormControl('0', [<any>Validators.required]),
      eComGstin: new FormControl('', [<any>Validators.required]),
    });
  }

  createInvoiceTypeRadioArray()
  {
    this.invoiceTypeRadioArray.push()
  }

  ngOnInit() {
    // if (this.access_token == null) {
    //   this.router.navigate(['/home']);
    //   return;
    // }

    this.access_token = localStorage.getItem('user_token');

    this.getStateList();
    this.getCustomerNames();
  }

  getCustomerNames() {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/customer/index?token=' + this.access_token + '&limit=' + 5000, options)
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

    if (this.query !== "") {

      this.filteredList = this.customersNamesList.filter(function (el) {
        return el.toString().toLowerCase().indexOf(this.query.toString().toLowerCase()) > -1;
      }.bind(this));
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
    this.customerDetailsForm.get('gstin').setValue(this.selectedCustomerData[0].gstin);
  }

  selectRadio() {
    if (this.invoiceTypeRadioForm.controls.invoiceTypeRadio.value === "E_Commerce") {
      this.disableEcommerceInput = true;
    }
    else {
      this.disableEcommerceInput = false;
    }
    console.log("CLICKEED", this.disableEcommerceInput);
  }

  addInvoice() {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    // const body = {
    //   "gstin": this.userGstin,
    //   "fp": this.customerDetailsForm.controls.date.value,
    //   "gt": this.customerDetailsForm.controls.gstin.value,
    //   "cur_gt": this.customerDetailsForm.controls.gstin.value,
    //   "inum": this.customerDetailsForm.controls.invoiceNo.value,
    //   "b2b": [
    //     {
    //       "ctin": this.customerDetailsForm.controls.gstin.value,
    //       "inv": [
    //         {
    //           "inum":this.customerDetailsForm.controls.invoiceNo.value,
    //           "idt": this.customerDetailsForm.controls.date.value,
    //           "val": this.grandTotal,
    //           "pos": this.customerDetailsForm.controls.pos,
    //           "rchrg": "N",
    //           "etin": this.customerDetailsForm.controls.gstin,
    //           "inv_typ": "R",
    //           "itms": [
    //             {
    //               "num": 1,
    //               "itm_det": {
    //                 "rt": 5,
    //                 "txval": 10000,
    //                 "iamt": 833.33,
    //                 "csamt": 500
    //               }
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // };

    const body={
      "gstin": "anil",
      "fp": "kjdskfkj392",
      "gt":"sadfd34543543df",
      "cur_gt":3748578584735,
      "inum": "S008300",
      "b2b": [
      {
        "ctin": "01AABCE2207R1Z5",
        "inv": [
          {
            "inum": "S008400",
            "idt": "24-11-2016",
            "val": 729248.16,
            "pos": "06",
            "rchrg": "N",
            "etin": "01AABCE5507R1C4",
            "inv_typ": "R",
            "itms": [
              {
                "num": 1,
                "itm_det": {
                  "rt": 5,
                  "txval": 10000,
                  "iamt": 833.33,
                  "csamt": 500
                }
              }
            ]
          }
        ]
      }
    ]
    };

    console.log("BODY",body);

    this.http.post('http://localhost:3000/api/invoice/create?token=' + this.access_token, body, options)
      .subscribe(
      response => {
        console.log("RESPONSE", response);
        // this.customerDetailsList = response.json().docs;
        // for (let data of response.json().docs) {
        //   this.customersNamesList.push(data.name);
        //   console.log("CUSTOMER_NAMES", this.customersNamesList);
        // }
      },
      error => {
        console.log(response);
      }
      );
  }

  getStateList() {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/state/list?token=' + this.access_token + '&limit=' + 1000, options)
      .subscribe(
      response => {
        this.stateList = response.json().state;
      },
      error => {
        console.log(error.text());
      }
      );
  }

}
