import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { PagerService } from '../service/pager.service';

@Component({
  selector: 'app-admin-faqs',
  templateUrl: './admin-faqs.component.html',
  styleUrls: ['./admin-faqs.component.css'],
  providers: [PagerService]
})
export class AdminFaqsComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;
  faqsList = [];
  StateVal = {};
  url = "";
  faqsRowData;
  rowDataIndex = "";

  apiMessage;
  apiResult = 0;

  access_token;
  currentPage: number;
  public FaqForm: FormGroup; // our model driven form
  public FaqFormEdit: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(private _fb: FormBuilder, private http: Http, public Router: Router, public PagerService: PagerService) {
    this.access_token = localStorage.getItem("admin_token");
    this.pager.currentPage=1;
    this.getFaqsList(1);
  }

  ngOnInit() {
    this.FaqForm = new FormGroup({
      question: new FormControl('', [<any>Validators.required]),
      answer: new FormControl('', [<any>Validators.required])
    });
    this.FaqFormEdit = new FormGroup({
      question: new FormControl('', [<any>Validators.required]),
      answer: new FormControl('', [<any>Validators.required])
    });

    var context = this;
    if (localStorage.getItem('admin_token')) {

    }
    else {
      context.Router.navigate(['/admin-login']);
    }

  }

  saveFaqs(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);

    if (isValid == true) {

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "question": this.FaqForm.value.question,
        "answer": this.FaqForm.value.answer
      };
      this.url = "http://localhost:3000/api/faq/create?token=" + this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          this.getFaqsList(this.pager.currentPage);
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  getFaqsList(page:number) {
    this.pager.currentPage=page;
    console.log('list called');
    this.http.get('http://localhost:3000/api/faq/index?token=' + this.access_token + '&limit=' + 10 + '&page=' +page).subscribe(data => {
      this.faqsList = data.json().docs;
      this.pager.pageSize = data.json().limit;
      this.pager.totalItems = data.json().total;
      this.setPage();
    });
  }

  setPage() {
    if (this.pager.currentPage < 1 || this.pager.currentPage > this.pager.TotalPages) {
      return;
    }

    this.pager = this.PagerService.getPager(this.pager.totalItems, this.pager.currentPage, this.pager.pageSize);
    console.log("pager", this.pager);
    // this.getStateList();
    this.pagedItems = this.faqsList;
  }

  editFaqsRecord(data) {
    this.submittedEdit = false;
    this.apiResult = 0;
    this.apiMessage = "";
    this.rowDataIndex = data._id;
    var temp;
    if (data) {

      console.log("DATA", data);
      this.FaqFormEdit.get("question").setValue(data.question);
      this.FaqFormEdit.get("answer").setValue(data.answer);
    }
    this.faqsRowData = data;
  }

  deleteFaqsRecord(data) {
    this.submittedEdit = false;
    this.rowDataIndex = data._id;
    this.faqsRowData = data;
  }

  updateFaqs(isValid: boolean) {
    this.submittedEdit = true; // set form submit to true
    console.log(isValid);

    // if (isValid == true && this.FaqForm.value.selectedstateDropdown!='Select State') {
    if (isValid == true) {

      // var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      const requestOptions = new RequestOptions({ headers: headers });

      const body = {
        "_id": this.faqsRowData._id,
        "question": this.FaqFormEdit.value.question,
        "answer": this.FaqFormEdit.value.answer,
      };

      this.url = "http://localhost:3000/api/faq/update?token=" + this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.apiResult = 1;
          // this.faqsList[this.rowDataIndex] = body;
          // alert(response.json().message);
          this.getFaqsList(this.pager.currentPage);
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
          this.apiResult = -1;
          this.apiMessage = error.json().message;
        }
        );
    }
  }
  deleteFaqs() {
    console.log("delete api", this.faqsRowData._id);
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });

    this.url = "http://localhost:3000/api/faq/delete/" + this.faqsRowData._id + "?token=" + this.access_token;
    return this.http.delete(this.url, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeDeleteModal();

        // alert(response.json().message);
        this.getFaqsList(this.pager.currentPage);
      },
      error => {
        console.log("error", error.message);
        console.log(error.text());
      }
      );
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

  resetForm() {
    this.apiResult = 0;
    this.apiMessage = "";
    this.submitted = false;
    this.FaqForm.reset();
  }
}
