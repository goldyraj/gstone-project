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
  customerDetailsList=[];

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

  customerDetailsForm: FormGroup;
  selectedCustomerData:any;
  disableEcommerceInput:boolean=false;

  constructor(public http: Http, private pagerService: PagerService, private router: Router) {

    this.invoiceTypeRadioForm = new FormGroup({
      invoiceTypeRadio: new FormControl('', [<any>Validators.required]),
    });

    this.customerDetailsForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      invoiceNo: new FormControl('', [<any>Validators.required]),
      date: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      pos: new FormControl('', [<any>Validators.required]),
      eComGstin: new FormControl('', [<any>Validators.required]),
    });
  }

  ngOnInit() {
    // if (this.access_token == null) {
    //   this.router.navigate(['/home']);
    //   return;
    // }

    this.access_token = localStorage.getItem('user_token');

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
        this.customerDetailsList=response.json().docs;
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
    this.selectedCustomerData= this.customerDetailsList.filter(x => x.name == item);
    console.log("NAME",this.selectedCustomerData);
    console.log("GSTIN",this.selectedCustomerData.gstin);
    this.customerDetailsForm.get('gstin').setValue(this.selectedCustomerData[0].gstin);
  }

  selectRadio() {
    if(this.invoiceTypeRadioForm.controls.invoiceTypeRadio.value==="E_Commerce")
    {
      this.disableEcommerceInput=true;
    }
    else
    {
      this.disableEcommerceInput=false;
    }
    console.log("CLICKEED",this.disableEcommerceInput);
  }

  addInvoice()
  {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    let itm_det={
      "rt":"",
      "txval":"",
      "iamt":"",
      "csamt":""
    };

    let items ={
      "num":"",
      // "itm_det":JSON.parse(itm_det)
    };

    let invArray={
        // "inum":this.customerDetailsForm.controls.invoiceNo.value,
        // "idt":this.customerDetailsForm.controls.date.value,
        // "val":this.customerDetailsForm.controls.
        // "pos":"",
        // "rchrg":"",
        // "etin":"",
        // "inv_typ":"",
        // "itms":JSON.parse()
    };

    // let b2bArray={
    //   "ctin":this.customerDetailsForm.controls.gstin.value,
    //   "inv"
    // };

    let body={
      "gstin":this.customerDetailsForm.controls.gstin.value,
      "fp":"",
      "gt":this.customerDetailsForm.controls.gstin.value,
      "cur_gt":this.customerDetailsForm.controls.gstin.value,
      "inum":this.customerDetailsForm.controls.gstin.value,
      "b2b":this.customerDetailsForm.controls.gstin.value,
      // "inum":this.customerDetailsForm.controls.gstin.value,
      // "inum":this.customerDetailsForm.controls.gstin.value,
      // "inum":this.customerDetailsForm.controls.gstin.value,
      // "inum":this.customerDetailsForm.controls.gstin.value,

    };

    this.http.post('http://localhost:3000/api/invoice/create?token=' + this.access_token + '&limit=' + 5000,body, options)
      .subscribe(
      response => {
        console.log("RESPONSE", response.json().docs);
        this.customerDetailsList=response.json().docs;
        for (let data of response.json().docs) {
          this.customersNamesList.push(data.name);
          console.log("CUSTOMER_NAMES", this.customersNamesList);
        }
      },
      error => {
        console.log(error.text());
      }
      );
  }

}
