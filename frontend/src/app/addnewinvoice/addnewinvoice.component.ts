import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as _ from 'underscore';
import { PagerService } from '../service/pager.service';
import { ExcelServiceService } from '../excel-service.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { NumberValidatorsService } from "../number-validators.service";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-addnewinvoice',
  templateUrl: './addnewinvoice.component.html',
  styleUrls: ['./addnewinvoice.component.css']
})
export class AddnewinvoiceComponent implements OnInit {
  personalDetails: any = [];
  invoiceList: any = [];
  personalData = [];
  public addTableForm: FormGroup;
  public addInvoiceForm: FormGroup;
  public selectedAll: boolean;
  per = [];
  customerDetailsForm: FormGroup;
  selectedCustomerData: any;
  disableEcommerceInput: boolean = false;
  invoiceDynList = [];

  access_token: string;
  selectedName: string;
  customersNamesList = [];
  filteredList = [];
  query: string;
  invoiceTypeRadioForm: FormGroup;
  customerDetailsList = [];
<<<<<<< HEAD
  userGstin = "ABCDE123R";
  grandTotal: number = 1000000;
  stateList = [];
=======
>>>>>>> 95abe665185cb94af4c92b2b42cdb11c25bdb86a

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

  place = [
    'SELECT',
    '01-Jammu & Kashmir',
    '02-Himachal Pradesh',
    '03-Punjab',
    '04-Chandigarh',
    '05-Uttarakhand',
    '06-Haryana',
    '07-Delhi',
    '08-Rajasthan',
    '09-Uttar Pradesh',
    '10-Bihar',
    '11-Sikkim',
    '12-Arunachal Pradesh',
    '13-Nagaland',
    '14-Manipur',
    '15-Mizoram',
    '16-Tripura',
    '17-Meghalaya',
    '18-Assam',
    '19-West Bengal',
    '20-Jharkhand',
    '21-Odisha',
    '22-Chhattisgarh',
    '23-Madhya Pradesh',
    '24-Gujarat',
    '25-Daman & Diu',
    '26-Dadra & Nagar Haveli',
    '27-Maharashtra',
    '29-Karnataka',
    '30-Goa',
    '31-Lakshdweep',
    '32-Kerala',
    '33-Tamil Nadu',
    '34-Pondicherry',
    '35-Andaman & Nicobar Islands',
    '36-Telangana',
    '37-Andhra Pradesh',
    '97-Other Territory'
  ]
  constructor(private _fb: FormBuilder, public http: Http, private pagerService: PagerService, private router: Router) {
    this.invoiceList = [{
      "description": "",
      "goodservice": "",
      "hsn": "",
      "qty": "",
      "uom": "",
      "tax": "",
      "rtax": "",
      "cgst": "",
      "sgst": "",
      "igst": "",
      "val1": "",
      "val2": "",
      "val3": "",
      "val4": "",
    }];
    this.personalDetails =
      [
        {
          'fname': "",
          'lname': "",
          'email': "",
        }];
    this.personalData =
      [
        {
          'fname': 'Muhammed',
          'lname': 'Shanid',
          'email': 'shanid@shanid.com'
        },
        {
          'fname': 'John',
          'lname': 'Abraham',
          'email': 'john@john.com'
        },
        {
          'fname': 'Roy',
          'lname': 'Mathew',
          'email': 'roy@roy.com'
        }];
    console.log("length", this.personalDetails.length);
  }

  ngOnInit() {
    this.addTableForm = new FormGroup({
      fname: new FormControl('', [<any>Validators.required]),
      lname: new FormControl('', [<any>Validators.required]),
      email: new FormControl('', [<any>Validators.required]),
    });
    this.addInvoiceForm = new FormGroup({
      description: new FormControl('', [<any>Validators.required]),
      goodservice: new FormControl('', [<any>Validators.required]),
      hsn: new FormControl('', [<any>Validators.required]),
      qty: new FormControl('', [<any>Validators.required]),
      uom: new FormControl('', [<any>Validators.required]),
      tax: new FormControl('', [<any>Validators.required]),
      rtax: new FormControl('', [<any>Validators.required]),
      cgst: new FormControl('', [<any>Validators.required]),
      sgst: new FormControl('', [<any>Validators.required]),
      igst: new FormControl('', [<any>Validators.required]),
      val1: new FormControl('', [<any>Validators.required]),
      val2: new FormControl('', [<any>Validators.required]),
      val3: new FormControl('', [<any>Validators.required]),
      val4: new FormControl('', [<any>Validators.required]),
    });
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

    this.access_token = localStorage.getItem('user_token');

    this.getStateList();
    this.getCustomerNames();
  }
  addNew() {
    this.invoiceList = [
      {
        "description": "",
        "goodservice": "",
        "hsn": "",
        "qty": "",
        "uom": "",
        "tax": "",
        "rtax": "",
        "cgst": "",
        "sgst": "",
        "igst": "",
        "val1": "",
        "val2": "",
        "val3": "",
        "val4": "",
      }];
    this.invoiceDynList.push({
      "description": this.addInvoiceForm.value.description,
      "goodservice": this.addInvoiceForm.value.goodservice,
      "hsn": this.addInvoiceForm.value.hsn,
      "qty": this.addInvoiceForm.value.qty,
      "uom": this.addInvoiceForm.value.uom,
      "tax": this.addInvoiceForm.value.tax,
      "rtax": this.addInvoiceForm.value.rtax,
      "cgst": this.addInvoiceForm.value.cgst,
      "sgst": this.addInvoiceForm.value.sgst,
      "igst": this.addInvoiceForm.value.igst,
      "val1": this.addInvoiceForm.value.val1,
      "val2": this.addInvoiceForm.value.val2,
      "val3": this.addInvoiceForm.value.val3,
      "val4": this.addInvoiceForm.value.val4,
    })
    console.log("this.per", this.invoiceDynList);
  }
  // addNew() {
  //   // this.personalDetails.push({
  //   //   'fname': "",
  //   //   'lname': "",
  //   //   'email': "",
  //   // })
  //   this.personalDetails = [
  //     {
  //       'fname': "",
  //       'lname': "",
  //       'email': "",
  //     }];
  //   this.per.push({
  //     'fname': this.addTableForm.value.fname,
  //     'lname': this.addTableForm.value.lname,
  //     'email': this.addTableForm.value.email,
  //   })
  //   console.log("this.per", this.per);
  // }

  save() {
    // this.per.push({
    //   'fname': this.addTableForm.value.fname,
    //   'lname': this.addTableForm.value.lname,
    //   'email': this.addTableForm.value.email,
    // })
    console.log("push daa", this.per);
  }

  remove(data) {
    console.log("name", data);
    var index = -1;
    var arrPer = this.invoiceDynList.length;
    var arrPerData = this.invoiceDynList;
    for (var i = 0; i < arrPer; i++) {
      if (arrPerData[i].description === data) {
        console.log("arrPer", arrPerData[i].description);
        index = i;
        break;
      }
    }
    if (index === -1) {
      alert("Something gone wrong");
    }
    this.invoiceDynList.splice(index, 1);

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

    const body = {
      "gstin": this.userGstin,
      "fp": this.customerDetailsForm.controls.date.value,
      "gt": this.customerDetailsForm.controls.gstin.value,
      "cur_gt": this.customerDetailsForm.controls.gstin.value,
      "inum": this.customerDetailsForm.controls.invoiceNo.value,
      "b2b": [
        {
          "ctin": this.customerDetailsForm.controls.gstin.value,
          "inv": [
            {
              "inum": this.customerDetailsForm.controls.invoiceNo.value,
              "idt": this.customerDetailsForm.controls.date.value,
              "val": this.grandTotal,
              "pos": this.customerDetailsForm.controls.pos,
              "rchrg": "N",
              "etin": this.customerDetailsForm.controls.gstin,
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

    console.log("BODY", body);

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
        console.log(error);
        if (error.text() == "Invoice Number Allready exists") {

        }
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
  // remove(data) {
  //   console.log("name", data);
  //   var index = -1;
  //   var arrPer = this.per.length;
  //   var arrPerData = this.per;
  //   for (var i = 0; i < arrPer; i++) {
  //     if (arrPerData[i].fname === data) {
  //       console.log("arrPer", arrPerData[i].fname);
  //       index = i;
  //       break;
  //     }
  //   }
  //   if (index === -1) {
  //     alert("Something gone wrong");
  //   }
  //   this.per.splice(index, 1);
  //   // console.log()
  //   // this.personalDetails.pop(data);
  //   // this.per.pop();

  // }

  // addNew() {
  //   this.personalDetails.push({
  //     'fname': "",
  //     'lname': "",
  //     'email': "",
  //   })
  //   console.log("this.personalDetails", this.personalDetails);

  // }
  // addNew(data) {
  //   console.log("data",data);
  //   this.personalDetails.push({
  //     'fname': this.addTableForm.value.fname,
  //     'lname': this.addTableForm.value.lname,
  //     'email': this.addTableForm.value.email,
  //   })
  //   this.addTableForm.value.fname = "";
  //   this.addTableForm.value.lname = "";
  //   this.addTableForm.value.email = "";
  //   console.log("this.personalDetails", this.personalDetails);

  // }


  // checkAll() {
  //   if (!this.selectedAll) {
  //     this.selectedAll = true;
  //   } else {
  //     this.selectedAll = false;
  //   }
  //   forEach(this.personalDetails, function (personalDetail) {
  //     personalDetail.selected = this.selectedAll;
  //   });
  // }


}
