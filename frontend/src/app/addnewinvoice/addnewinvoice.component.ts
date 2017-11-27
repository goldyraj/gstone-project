import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as _ from 'underscore';
import { PagerService } from '../service/pager.service';
import { ExcelServiceService } from '../excel-service.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { NumberValidatorsService } from "../number-validators.service";
import { ApiserviceService } from '../apiservice.service';
import { concat } from 'rxjs/operator/concat';

@Component({
  selector: 'app-addnewinvoice',
  templateUrl: './addnewinvoice.component.html',
  styleUrls: ['./addnewinvoice.component.css'],
  providers: [ApiserviceService]
})
export class AddnewinvoiceComponent implements OnInit {
  descriptionQuery: string;
  public reimburshForm: FormGroup;
  public invoiceForm: FormGroup;
  salesListArray: FormArray;
  myModel: any;
  public selectedAll: boolean;
  a: number;
  total: number;
  filteredDescriptionList = [];
  // public addTableForm: FormGroup;
  // public addInvoiceForm: FormGroup;
  customersGoodsAndServciesList = [];
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
  ];
  summed: number;
  constructor(private formBuilder: FormBuilder, private ref: ChangeDetectorRef, private fb: FormBuilder, private pagerService: PagerService, private router: Router, public http: Http, public apiserviceService: ApiserviceService) {
    // this.myModel = {
    //   salesList: [
    //     { val5: 111.11 },
    //     { val5: 222.22 }
    //   ]
    // };
    // console.log("mymodel", this.myModel.salesList);
  }

  ngOnInit() {

    this.invoiceForm = this.fb.group({
      itemRows: this.fb.array([this.initItemRows()]),
      summed: [null]
    });
    this.reimburshForm = this.formBuilder.group({
      name: this.formBuilder.control(null),
      invoiceNo: this.formBuilder.control({ value: null, disabled: true }),
      date: this.formBuilder.control(null),
      gstin: this.formBuilder.control(null),
      pos: this.formBuilder.control('0'),
      eComGstin: this.formBuilder.control(null),
      salesPerson: this.formBuilder.control(null),
      invoiceTypeRadio: this.formBuilder.control(null),
      total: [null],
      salesList: this.formBuilder.array([this.initIRows()]),
    });

    this.invoiceForm.get('itemRows').valueChanges.subscribe(values => {
      this.summed = 0;
      const ctrl = <FormArray>this.invoiceForm.controls['itemRows'];
      ctrl.controls.forEach(x => {
        let parsed = parseInt(x.get('itemamt').value)
        this.summed += parsed;
        this.ref.detectChanges();
        console.log("summed", this.summed);
      });
    });


    // this.reimburshForm.controls.salesList.valueChanges.subscribe(x => {
    //   console.log("ji");
    // })
    this.reimburshForm.get('salesList').valueChanges.subscribe(values => {

      this.total = 0;
      const ctrl = <FormArray>this.reimburshForm.controls['salesList'];
      ctrl.controls.forEach(x => {
        let parsed = parseInt(x.get('val4').value);
        // console.log("valsss",x);
        this.total += parsed;
        // this.ref.detectChanges();

        console.log("inside total", this.total);
      });
      // console.log(" out side total", this.total);
      return this.total;
    })

    // console.log("total", this.total);
    // this.access_token = localStorage.getItem('user_token');
    // this.buildForm();
    // this.getCustomerNames();
    // this.getStateList();
    // this.reimburshForm.valueChanges.subscribe((change) => {
    //   console.log("hi");
    //   const calculateAmount = (salesList: any[]): number => {
    //     return salesList.reduce((acc, current) => {
    //       return acc + parseFloat(current.val5 || 0);
    //     }, 0);
    //   }
    //   console.log("changes vale", calculateAmount(this.reimburshForm.value));
    // })
    // this.reimburshForm.get('salesList').valueChanges.subscribe( x => console.log(x));
    // this.reimburshForm.get('salesList').valueChanges.subscribe(x => {
    //   console.log("changed val",x,x[0].val5,x['val5']);
    // });

    // this.reimburshForm.controls.val5.valueChanges.subscribe(x => console.log("changed val", x));


  }

  initItemRows() {
    return this.fb.group({
      itemqty: null,
      itemrate: null,
      itemamt: [null]
    });
  }

  initIRows() {
    // return this.fb.group({
    //   itemqty: null,
    //   itemrate: null,
    //   itemamt: [null]
    // });
    return this.formBuilder.group({
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
  }

  addNewRow() {
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    control.push(this.initItemRows());
  }

  // deleteRow(index: number) {
  //   const control = <FormArray>this.invoiceForm.controls['itemRows'];
  //   control.removeAt(index);
  // }
  sumPayOffs() {
    // this.reimburshForm.get('salesList').valueChanges.subscribe(values => {
    //   this.total = 0;
    //   const ctrl = <FormArray>this.reimburshForm.controls['salesList'];
    //   ctrl.controls.forEach(x => {
    //     let parsed = parseInt(x.get('val4').value);
    //     // console.log("valsss",x);
    //     this.total += parsed;
    //     this.ref.detectChanges()

    //     console.log("total",this.total);
    //   });
    // })
    // return this.total;
    // return this.reimburshForm..reduce((sum, val) => sum + val.val5, 0);
    // var a = 1;
    // return a;
    // this.reimburshForm.

    // this.reimburshForm.controls.salesList.val5.

    // this.reimburshForm.controls.salesList.valueChanges
    // const control = <FormArray>this.reimburshForm.controls['salesList'];
    // remove the chosen row
    // control.removeAt(index);
    // var a = control.get('val5');
    // console.log("a", control.controls);
    // control.controls.forEach(s => {
    //   console.log("s", s.value);
    // })
    // console.log("index",index);
    // this.reimburshForm.get('salesList').valueChanges.subscribe(x => {
    //   console.log("changed val", x, x[index].val2);
    //   this.a = x[index].val2;
    //   console.log("inside", this.a);
    // });

    // this.reimburshForm.get('salesList').valueChanges.subscribe(values => {
    //   this.a = 0;
    //   const ctrl = <FormArray>this.reimburshForm.controls['salesList'];
    //   ctrl.controls.forEach(x => {
    //     let parsed = parseInt(x.get('val2').value)
    //     this.a += parsed
    //     // this.ref.detectChanges()
    //   });
    // })
    // console.log("outside", this.a);
    // return this.a;
    // this.getCustomersGoodsAndServices();


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
      total: [null],
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

    const control = <FormArray>this.reimburshForm.controls['salesList'];
    control.push(this.initIRows());

    // this.salesListArray.push(formGroup);
    // console.log("added val", this.salesListArray);
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

    this.http.get(this.apiserviceService.BASE_URL + 'customer/index?token=' + this.access_token + '&limit=' + 5000, options)
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

    this.http.get(this.apiserviceService.BASE_URL + 'state/list?token=' + this.access_token + '&limit=' + 1000, options)
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

  getCustomersGoodsAndServices() {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    // myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    // myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    // myHeaders.append('Access-Control-Allow-Origin', '*');
    // myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get(this.apiserviceService.BASE_URL + 'goodsuser/index?token=' + this.access_token + '&limit=5000', options)
      .subscribe(
      response => {
        this.customersGoodsAndServciesList = response.json().docs;
        console.log("GOODSSERVICES", this.customersGoodsAndServciesList);
      },
      error => {
        console.log(error.text());
      }
      );
  }

  selectDesciption(item) {
    this.descriptionQuery = item.description;
    this.filteredDescriptionList = [];
    this.reimburshForm.get('hsn').setValue(item.hsn_code);
    // this.reimburshForm.get('qty').setValue(item.qty);
    this.reimburshForm.get('goodservice').setValue(item.type)
  }

  searchDescription() {
    if (this.descriptionQuery !== "") {
      // this.customersGoodsAndServciesList = [
      //   { "description": "nick" },
      //   { "description": "shos" },
      //   { "description": "shirt" },
      //   { "description": "beg" }
      // ];
      this.filteredDescriptionList = this.customersGoodsAndServciesList.filter(function (el) {
        return el.description.toString().toLowerCase().indexOf(this.descriptionQuery.toString().toLowerCase()) > -1;
      }.bind(this));
      if (this.filteredDescriptionList.length == 0) {
        this.filteredDescriptionList = [{ "description": "No Such Item" }];
      }
      console.log("filteredDescriptionList", this.filteredDescriptionList);
    } else {
      this.filteredDescriptionList = [];

    }
  }


}
