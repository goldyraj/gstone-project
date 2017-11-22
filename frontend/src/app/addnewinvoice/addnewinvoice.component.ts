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

  access_token:string;
  selectedName:string;
  customersNamesList=[];
  filteredList=[];
  query:string;

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

  constructor(public http: Http, private pagerService: PagerService, private router: Router) {

  }

  ngOnInit() {
    if (this.access_token == null) {
      this.router.navigate(['/home']);
      return;
    }

    this.access_token = localStorage.getItem('user_token');

    this.getCustomerNames();
  }

  getCustomerNames() {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    // myHeaders.append('x-access-token', access_token);
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    // headers.append('Accept','charset=utf-8');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/customer/index?token=' + this.access_token + '&limit=' + 5000, options)
      .subscribe(
      response => {
        // this.customersNamesList = response.json().docs;
        console.log("RESPONSE", response.json().docs);
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

  search(query) {
    
    if (query !== "") {
      this.query=query;
      this.filteredList = this.customersNamesList.filter(function (el) {
        return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
    } else {
      this.filteredList = [];
    }
  }

  select(item) {
    this.query = item;
    this.filteredList = [];
  }

}
