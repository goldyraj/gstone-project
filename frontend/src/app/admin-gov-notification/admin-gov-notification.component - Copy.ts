import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-admin-gov-notification',
  templateUrl: './admin-gov-notification.component.html',
  styleUrls: ['./admin-gov-notification.component.css']
})
export class AdminGovNotificationComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;
  notificationList = [];
  StateVal = {};
  url = "";
  faqsRowData;
  rowDataIndex = "";
  Paging = {
    page: 1,
    limit: 2
  };


  // notificationList: Product[]=;
  pages: number ;
  pageSize: number;
  pageNumber: number = 0;
  // Paging.page: number = 1;
  items = this.notificationList;
  pagesIndex: Array<number>;
  pageStart: number = 1;
  inputName: string = '';

  TotalPages: number;
  // pageSize: number;
  currentPage: number;
  public govNotiForm: FormGroup; // our model driven form
  public editGovNotiForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  constructor(private _fb: FormBuilder, private http: Http) {
    this.getNotificationList();
  }

  ngOnInit() {
    this.govNotiForm = new FormGroup({
      title: new FormControl('', [<any>Validators.required]),
      description: new FormControl('', [<any>Validators.required]),
      link: new FormControl('', [<any>Validators.required])
    });
    this.editGovNotiForm = new FormGroup({
      question: new FormControl('', [<any>Validators.required]),
      answer: new FormControl('', [<any>Validators.required])
    });

    this.Paging.page = 1;
    this.pageStart = 1;
    this.pages = 4;

    this.pageNumber = parseInt("" + (this.notificationList.length / this.pageSize));
    if (this.notificationList.length % this.pageSize != 0) {
      this.pageNumber++;
    }

    if (this.pageNumber < this.pages) {
      this.pages = this.pageNumber;
    }

    this.refreshItems();
    console.log("this.pageNumber :  " + this.pageNumber);
  }
  refreshItems() {
    this.items = this.notificationList.slice((this.Paging.page - 1) * this.pageSize, (this.Paging.page) * this.pageSize);
    this.pagesIndex = this.fillArray();
  }
  fillArray(): any {
    var obj = new Array();
    for (var index = this.pageStart; index < this.pageStart + this.pages; index++) {
      obj.push(index);
    }
    return obj;
  }
  prevPage() {
    if (this.Paging.page > 1) {
      this.Paging.page--;
    }
    if (this.Paging.page < this.pageStart) {
      this.pageStart = this.Paging.page;
    }
    this.refreshItems();
  }
  nextPage() {
    if (this.Paging.page < this.TotalPages) {
      this.Paging.page++;
    }
    // if (this.Paging.page < this.TotalPages) {
    //       this.Paging.page++;
    //     }
    if (this.Paging.page >= (this.pageStart + this.TotalPages)) {
      this.pageStart = this.Paging.page - this.TotalPages + 1;
    }
    this.getNotificationList();
  }
  setPage(index: number) {
    this.Paging.page = index;
    this.refreshItems();
  }


  getNotificationList() {
    console.log('list called');
    this.http.get('http://localhost:3000/api/notification/index?limit=' + this.Paging.limit + '&page=' + this.Paging.page + '&sortBy=title&search=').subscribe(data => {
      this.notificationList = data.json().docs;
      this.TotalPages = data.json().total;
      // this.pages = data.json().total;
      this.pageSize = this.Paging.limit;
      this.currentPage = this.Paging.page;
      console.log("pagecount", )
      console.log("State  PArse", this.notificationList);
      console.log("TotalPages", this.TotalPages);
    });
  }

  saveNotification(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    this.StateVal = this.govNotiForm.value;
    console.log("form valuse", this.StateVal);

    if (isValid == true) {

      var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "title": this.govNotiForm.value.title,
        "description": this.govNotiForm.value.description,
        "link": this.govNotiForm.value.link
      };
      this.url = "http://localhost:3000/api/notification/create";
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }
  // nextPage() {
  //   console.log("paging");
  //   if (this.Paging.page < this.TotalPages) {
  //     this.Paging.page++;
  //     this.getNotificationList();
  //   }
  // }

  previousPage() {
    console.log("paging");
    if (this.Paging.page > 1) {
      this.Paging.page--;
      this.getNotificationList();
    }
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  private closeEditModal(): void {
    this.closeBtn2.nativeElement.click();
  }
  private closeDeleteModal(): void {
    this.closeBtn3.nativeElement.click();
  }

}