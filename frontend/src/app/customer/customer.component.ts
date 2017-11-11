import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ExcelServiceService } from '../excel-service.service';
import * as _ from 'underscore';
import { PagerService } from '../service/pager.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [PagerService, ExcelServiceService]
})
export class CustomerComponent implements OnInit {
  // constructor() { }
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;
  modelHide = '';
  url = "";
  cutomer = {};
  stateList = [];
  submittedEdit: boolean = false;
  custList = [];
  data = [];
  rowDataIndex;
  public myForm: FormGroup; // our model driven form
  public myFormEdit: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public csvString;
  customerRowData;
  stateDropdown = Array();
  selectedState = "";

  // pager object
  pager: any = {};
  custRowData;
  // paged items
  pagedItems: any[];
  access_token;

  constructor(private _fb: FormBuilder, private http: Http, public excelServiceService: ExcelServiceService, public pagerService: PagerService) {
    this.access_token = localStorage.getItem("user_token");
    console.log("user_token", this.access_token);
    this.pager.currentPage = 1;
    this.getCustomerList(1);
    this.getStateList();
    console.log("custructor call");
  }
  onInput($event) {
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
    this.selectedState = $event.target.value;
  }
  ngOnInit() {

    this.stateDropdown.push("Jabalpur");
    this.stateDropdown.push("Bhopal");
    this.stateDropdown.push("Indore");

    this.myForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      contact: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      pan_no: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      email: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      address: new FormControl('', [<any>Validators.required]),
      city: new FormControl('', [<any>Validators.required]),
      selectedstateDropdown: new FormControl('-1')
    });

    this.myFormEdit = new FormGroup({
      name: new FormControl('', [<any>Validators.required]),
      contact: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      pan_no: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),
      email: new FormControl('', [<any>Validators.required]),
      gstin: new FormControl('', [<any>Validators.required]),
      address: new FormControl('', [<any>Validators.required]),
      city: new FormControl('', [<any>Validators.required]),
      selectedstateDropdown: new FormControl('Select State')
    });
  }

  saveCustomer(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    console.log("form val", this.myForm.value.name);
    this.cutomer = this.myForm.value;
    console.log("form valuse", this.cutomer);

    if (isValid == true) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', this.access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "name": this.myForm.value.name,
        "pan_no": this.myForm.value.pan_no,
        "gstin": this.myForm.value.gstin,
        "city": this.myForm.value.city,
        "contact": this.myForm.value.contact,
        "email": this.myForm.value.email,
        "address": this.myForm.value.address,
        "state": this.selectedState
      };

      this.url = "http://localhost:3000/api/customer/create?token=" + this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          // this.custList.push(body);
          // alert(response.json().message);
          this.myForm.reset();
          this.myForm.get("selectedstateDropdown").setValue("Select State");
          this.submitted = false;
          this.getCustomerList(this.pager.currentPage);
          this.customerRowData = null;
        },
        error => {
          // alert(error.message);
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  deleteCustomerRecord(data) {
    this.rowDataIndex = data._id;
    this.custRowData = data;
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

  deleteCustomer() {
    console.log("delete api", this.custRowData._id);
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });

    this.url = "http://localhost:3000/api/customer/delete/" + this.custRowData._id;
    return this.http.delete(this.url, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeDeleteModal();
        this.submittedEdit = false;
        // alert(response.json().message);
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
      }
      );
  }

  private closeDeleteModal(): void {
    this.closeBtn3.nativeElement.click();
  }
  

  getCustomerList(page: number) {
    this.pager.currentPage = page;
    this.http.get('http://localhost:3000/api/customer/index?token=' + this.access_token + '&limit=5&page=' + this.pager.currentPage + '&sortBy=title&search=').subscribe(data => {
      console.log("customer list", data);
      this.custList = data.json().docs;
      this.pager.pageSize = data.json().limit;
      this.pager.totalItems = data.json().total;
      this.setPage();
      console.log("verder  PArse", this.custList);
    });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  private closeEditModal(): void {
    this.closeBtn2.nativeElement.click();
  }

  editCustomerRecord(data) {
    this.rowDataIndex = data._id;
    var temp;
    if (data) {
      console.log("DATA", data);

      this.myFormEdit.get("name").setValue(data.name);
      this.myFormEdit.get("pan_no").setValue(data.pan_no);
      this.myFormEdit.get("gstin").setValue(data.gstin);
      this.myFormEdit.get("city").setValue(data.city);
      this.myFormEdit.get("contact").setValue(data.contact);
      this.myFormEdit.get("email").setValue(data.email);
      this.myFormEdit.get("address").setValue(data.address);
      // this.myFormEdit.get("state").setValue(data.state);
    }

    this.customerRowData = data;

  }

  updateCustomerRecord(isValid: boolean) {
    this.submittedEdit = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");

    // if (isValid == true && this.myFormEdit.value.selectedstateDropdown!='Select State') {
    if (isValid == true) {

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', this.access_token);
      const requestOptions = new RequestOptions({ headers: headers });

      const body = {
        "_id": this.customerRowData._id,
        "name": this.myFormEdit.value.name,
        "pan_no": this.myFormEdit.value.pan_no,
        "gstin": this.myFormEdit.value.gstin,
        "city": this.myFormEdit.value.city,
        "email": this.myFormEdit.value.email,
        "address": this.myFormEdit.value.address,
        "state": this.myFormEdit.value.selectedstateDropdown,
        "contact": this.myFormEdit.value.contact
      };

      this.url = "http://localhost:3000/api/customer/update?token=" + this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.submittedEdit = false;
          // this.hsnCodeData.push(body);
          this.custList[this.rowDataIndex] = body;
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
        this.csvString = this.excelServiceService.CSV2JSON(csv);
        // var csvString=this.CSV2JSON(csv);
        // this.uploadCsvFileToServer(csvString);
      }
    }
  }

  uploadCsvFileToServer() {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({ headers: headers });
    const body = {
      "data": JSON.parse(this.csvString)
    };

    this.url = "http://localhost:3000/api/customer/uploadFile?token=" + this.access_token;
    return this.http.post(this.url, body, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json());
        this.closeModal();
        if (response.json().message != null) {
          alert(response.json().message);
          this.getCustomerList(this.pager.currentPage);
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

  downloadJSONTOCSV() {
    this.getCustomerList(this.pager.currentPage);
    this.excelServiceService.exportAsExcelFile(this.custList, "CustomerJSNTOCSV");
  }

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.custList;
  }
}
