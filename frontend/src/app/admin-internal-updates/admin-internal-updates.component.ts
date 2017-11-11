import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as _ from 'underscore';
import {PagerService} from '../service/pager.service';

@Component({
  selector: 'app-admin-internal-updates',
  templateUrl: './admin-internal-updates.component.html',
  styleUrls: ['./admin-internal-updates.component.css'],
  providers:[PagerService]
})
export class AdminInternalUpdatesComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;

  chapterArray=[];
  articleArray=[];
  secondDropDownArray=[];
  internalUpdateList = [];
  StateVal = {};
  url = "";
  notiRowData;
  rowDataIndex = "";
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  selectUpdateType;
  selectChapterArticle;
  public internalUpdateForm: FormGroup; // our model driven form
  public editInternalUpdate: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public submittedEdit: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public chapter;

  access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWYwNWRjZmNlNzE1YzIyNjBlYTc0YTMiLCJ1c2VybmFtZSI6Im1heXVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUwODkzODk1MCwiZXhwIjoxNTA5NTQzNzUwLCJpc3MiOiJ2ZWxvcGVydC5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.lXiq1kueJTk8qhgNJS89ANtTOWughJkqGz8OaF5xbaw";
  constructor(private _fb: FormBuilder, private http: Http,public PagerService:PagerService) {
    this.pager.currentPage=1;
    this.access_token = localStorage.getItem("admin_token");
    this.getInternalUpdateList(this.pager.currentPage);
  }

  ngOnInit() {
    this.internalUpdateForm = new FormGroup({
      selectUpdateType:new FormControl("Select Update Type"),
      selectChapterArticle:new FormControl("Select Chapter/Article"),
      title: new FormControl('', [<any>Validators.required]),
      details: new FormControl('', [<any>Validators.required]),
      link: new FormControl('', [<any>Validators.required])
    });

    this.editInternalUpdate = new FormGroup({
      selectUpdateType:new FormControl("Select Update Type"),
      selectChapterArticle:new FormControl("Select Chapter/Article"),
      title: new FormControl('', [<any>Validators.required]),
      details: new FormControl('', [<any>Validators.required]),
      link: new FormControl('', [<any>Validators.required]),
    });

    this.setupChapterArray();
    this.setupArticleArray();
  }

  getInternalUpdateList(page:number) {
    this.pager.currentPage=page;
    console.log('list called');
    this.http.get('http://localhost:3000/api/internal/index?token='+this.access_token+'&limit=' + 10 + '&page=' + this.pager.currentPage + '&sortBy=created_at&search=').subscribe(data => {
      this.internalUpdateList = data.json().docs;
      this.pager.pageSize = data.json().limit;
      this.pager.totalItems=data.json().total;
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
    this.pagedItems = this.internalUpdateList;
  }

  addInternalUpdate(isValid: boolean) {
    this.submitted = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    this.StateVal = this.internalUpdateForm.value;
    console.log("form valuse", this.StateVal);

    if (isValid == true) {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      var chapterParam;
      var articleParam;
      if(this.internalUpdateForm.value.selectedType==="chapter")
      {
        chapterParam=this.internalUpdateForm.value.selectChapterArticle;
      }
      else
      {
        articleParam=this.internalUpdateForm.value.selectChapterArticle;
      }
      
      const requestOptions = new RequestOptions({ headers: headers });
      const body = {
        "title": this.internalUpdateForm.value.title,
        "details": this.internalUpdateForm.value.details,
        "link": this.internalUpdateForm.value.link,
        "date": "13/11/2017",
        "type":this.internalUpdateForm.value.selectedType,
        "chapter":chapterParam,
        "article":articleParam
      };
      this.url = "http://localhost:3000/api/internal/create?token="+this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          this.internalUpdateForm.reset();
          this.submitted=false;
          this.getInternalUpdateList(this.pager.currentPage);
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  editInternalRecord(data) {
    this.rowDataIndex = data._id;
    var temp;
    if (data) {
      console.log("DATA", data);
      this.editInternalUpdate.get("title").setValue(data.title);
      this.editInternalUpdate.get("details").setValue(data.details);
      this.editInternalUpdate.get("link").setValue(data.link);
      this.editInternalUpdate.get("selectChapterArticle").setValue(data.selectChapterArticle);
      this.editInternalUpdate.get("selectUpdateType").setValue(data.selectUpdateType);
      this.selectUpdateType=data.type;
      if(data.article!=null)
      {
        this.selectChapterArticle=data.article;
      }

      if(data.chapter!=null)
      {
        this.selectChapterArticle=data.chapter;
      }
    }
    this.notiRowData = data;
  }

  updateInternal(isValid: boolean) {
    this.submittedEdit = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    this.StateVal = this.editInternalUpdate.value;
    console.log("form valuse", this.StateVal);

    if (isValid == true) {

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      var chapterParam;
      var articleParam;
      if(this.internalUpdateForm.value.selectedType==="chapter")
      {
        chapterParam=this.internalUpdateForm.value.selectChapterArticle;
      }
      else
      {
        articleParam=this.internalUpdateForm.value.selectChapterArticle;
      }
      
      const requestOptions = new RequestOptions({ headers: headers });

      const body = {
        "_id": this.notiRowData._id,
        "title": this.editInternalUpdate.value.title,
        "details": this.editInternalUpdate.value.details,
        "link": this.editInternalUpdate.value.link,
        "type":this.internalUpdateForm.value.selectedType,
        "chapter":chapterParam,
        "article":articleParam
      };

      this.url = "http://localhost:3000/api/internal/update?token="+this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.submittedEdit = false;
          this.getInternalUpdateList(this.pager.currentPage);
        },
        error => {
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  deleteInternalRecord(data) {
    this.rowDataIndex = data._id;
    this.notiRowData = data;
  }

  deleteInternalUpdate() {
    console.log("delete api", this.notiRowData._id);
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });

    this.url = "http://localhost:3000/api/internal/delete/" + this.notiRowData._id+"?token="+this.access_token;
    return this.http.delete(this.url, requestOptions)
      .subscribe(
      response => {
        console.log("suceessfull data", response.json().message);
        this.closeDeleteModal();
        this.submittedEdit = false;
        this.getInternalUpdateList(this.pager.currentPage);
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

  resetForm()
  {
    this.internalUpdateForm.reset();
    this.internalUpdateForm.get('selectUpdateType').setValue('0');
    this.internalUpdateForm.get('selectChapterArticle').setValue('0');
  }

  setupChapterArray()
  {
    for(var i=0;i<=5;i++)
    {
      this.chapterArray.push("Chapter "+i);
    }
    // this.secondDropDownArray=this.chapterArray;
  }

  setupArticleArray()
  {
    for(var i=0;i<=5;i++)
    {
      this.articleArray.push("Article "+i);
    }
  }

  onSelectType(selectedType)
  {
    console.log("OnModelChange",selectedType);
    if(selectedType=='0')
    {
      return;
    }
    if(selectedType==="Chapter")
    {
      this.secondDropDownArray=this.chapterArray;
      
    }
    else if(selectedType==="Article")
    {
      this.secondDropDownArray=this.articleArray;
    }

    console.log("SELECTED",this.secondDropDownArray);
  }
}
