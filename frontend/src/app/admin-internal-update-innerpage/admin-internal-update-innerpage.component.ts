import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as _ from 'underscore';
import {PagerService} from '../service/pager.service';
import { RouterModule, Routes, Router } from '@angular/router';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-admin-internal-update-innerpage',
  templateUrl: './admin-internal-update-innerpage.component.html',
  styleUrls: ['./admin-internal-update-innerpage.component.css'],
  providers:[PagerService,ApiserviceService]
})
export class AdminInternalUpdateInnerpageComponent implements OnInit {

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
  apiMessage;
  apiResult=0;
  rowDataIndex = "";
  // pager object
  pager: any = {};
  backupInternalPager:any={};
  backupInternalList=[];
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
  constructor(private _fb: FormBuilder, private http: Http,public PagerService:PagerService,public router:Router,public ApiserviceService:ApiserviceService) {
    this.pager.currentPage=1;
    this.access_token = localStorage.getItem("admin_token");
    this.getInternalUpdateList(this.pager.currentPage);
  }

  ngOnInit() {
    this.internalUpdateForm = new FormGroup({
      selectUpdateType:new FormControl("0"),
      selectChapterArticle:new FormControl("0"),
      title: new FormControl('',[Validators.required,Validators.pattern(".*\\S.*"),Validators.pattern('^[a-zA-Z \-\']+')]),
      details: new FormControl('',[Validators.required,Validators.pattern(".*\\S.*")]),
      link: new FormControl('',[Validators.required,Validators.pattern(".*\\S.*")])
    });

    this.editInternalUpdate = new FormGroup({
      selectUpdateType:new FormControl("0"),
      selectChapterArticle:new FormControl("0"),
      title: new FormControl('',[Validators.required,Validators.pattern(".*\\S.*"),Validators.pattern('^[a-zA-Z \-\']+')]),
      details: new FormControl('', [<any>Validators.required]),
      link: new FormControl('', [<any>Validators.required]),
    });

    this.setupChapterArray();
    this.setupArticleArray();

    var context=this;
    if (localStorage.getItem('admin_token')!=null) {
      
    }
    else {
      context.router.navigate(['/admin-login']);
    }
  }

  getInternalUpdateList(page:number) {
    this.pager.currentPage=page;
    console.log('list called');
    this.http.get(this.ApiserviceService.BASE_URL+'internal/index?token='+this.access_token+'&limit=' + 10 + '&page=' + this.pager.currentPage + '&sortBy=created_at&search=').subscribe(data => {
      this.internalUpdateList = data.json().docs;
      this.pager.pageSize = data.json().limit;
      this.pager.totalItems=data.json().total;
      this.backupInternalList=this.internalUpdateList;
      this.setPage();
      this.backupInternalPager=this.pager;
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

    if (isValid == true && this.editInternalUpdate.controls.selectUpdateType.value!="0" &&  this.editInternalUpdate.controls.selectChapterArticle.value!="0") {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      // headers.append('x-access-token', access_token);
      var chapterParam;
      var articleParam;
      if(this.internalUpdateForm.value.selectUpdateType==="chapter")
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
        "type":this.internalUpdateForm.value.selectUpdateType,
        "chapter":chapterParam,
        "article":articleParam
      };
      this.url = this.ApiserviceService.BASE_URL+"internal/create?token="+this.access_token;
      return this.http.post(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeModal();
          this.internalUpdateForm.reset();
          this.apiResult=1;
          this.apiMessage=response.json().message;
          this.getInternalUpdateList(this.pager.currentPage);
        },
        error => {
          this.apiResult=-1;
          this.apiMessage=error.json().message;
          console.log("error", error.message);
          console.log(error.text());
        }
        );
    }
  }

  editInternalRecord(data) {
    this.apiMessage="";
    this.apiResult=0;
    this.submittedEdit = false;
    this.rowDataIndex = data._id;
    var temp;
    if (data) {
      console.log("DATA", data);
      this.editInternalUpdate.get("title").setValue(data.title);
      this.editInternalUpdate.get("details").setValue(data.details);
      this.editInternalUpdate.get("link").setValue(data.link);
      
      if(data.selectUpdateType==="chapter")
      {
        this.secondDropDownArray=this.chapterArray;
      }
      else if(data.selectUpdateType==="article")
      {
        this.secondDropDownArray=this.articleArray;
      }
      this.editInternalUpdate.get("selectUpdateType").setValue(data.type);
      
      this.selectUpdateType=data.type;
      if(data.article!=null)
      {
        this.selectChapterArticle=data.article;
      }

      if(data.chapter!=null)
      {
        this.selectChapterArticle=data.chapter;
      }

      console.log("DROP_DOWN_ARRAY",this.secondDropDownArray);
      console.log("SELECTED_CHAPTER_ARTICLE",this.selectChapterArticle);
    }
    this.notiRowData = data;
  }

  updateInternal(isValid: boolean) {
    this.submittedEdit = true; // set form submit to true
    console.log(isValid);
    console.log("hi form module is called from page");
    this.StateVal = this.editInternalUpdate.value;
    console.log("form valuse", this.StateVal);

    if (isValid == true && this.editInternalUpdate.controls.selectUpdateType.value!="0" &&  this.editInternalUpdate.controls.selectChapterArticle.value!="0") {

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      var chapterParam;
      var articleParam;
      if(this.editInternalUpdate.value.selectUpdateType==="chapter")
      {
        chapterParam=this.editInternalUpdate.value.selectChapterArticle;
      }
      else
      {
        articleParam=this.editInternalUpdate.value.selectChapterArticle;
      }
      
      const requestOptions = new RequestOptions({ headers: headers });

      const body = {
        "_id": this.notiRowData._id,
        "title": this.editInternalUpdate.value.title,
        "details": this.editInternalUpdate.value.details,
        "link": this.editInternalUpdate.value.link,
        "type":this.editInternalUpdate.value.selectUpdateType,
        "chapter":chapterParam,
        "article":articleParam
      };

      this.url = this.ApiserviceService.BASE_URL+"internal/update?token="+this.access_token;
      return this.http.put(this.url, body, requestOptions)
        .subscribe(
        response => {
          console.log("suceessfull data", response.json().message);
          this.closeEditModal();
          this.apiResult=1;
          this.getInternalUpdateList(this.pager.currentPage);
          this.apiMessage=response.json().message;
        },
        error => {
          this.apiResult=-1;
          console.log("error", error.message);
          console.log(error.text());
          this.apiMessage= error.json().message;
        }
        );
    }
  }

  recordToBeDeleted(data) {
    this.submittedEdit = false;
    this.rowDataIndex = data._id;
    this.notiRowData = data;
  }

  deleteInternalUpdate() {
    console.log("delete api", this.notiRowData._id);
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('x-access-token', access_token);
    const requestOptions = new RequestOptions({ headers: headers });

    this.url = this.ApiserviceService.BASE_URL+"internal/delete/" + this.notiRowData._id+"?token="+this.access_token;
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
    this.apiMessage="";
    this.apiResult=0;
    this.submitted=false;
    this.internalUpdateForm.reset();
    this.internalUpdateForm.get('selectUpdateType').setValue('0');
    this.internalUpdateForm.get('selectChapterArticle').setValue('0');
  }

  setupChapterArray()
  {
    for(var i=1;i<=5;i++)
    {
      this.chapterArray.push("Chapter "+i);
    }
    // this.secondDropDownArray=this.chapterArray;
  }

  setupArticleArray()
  {
    for(var i=1;i<=5;i++)
    {
      this.articleArray.push("Article "+i);
    }
  }

  onSelectType(selectUpdateType)
  {
    console.log("OnModelChange",selectUpdateType);
    if(selectUpdateType=='0')
    {
      return;
    }
    if(selectUpdateType==="chapter")
    {
      this.secondDropDownArray=this.chapterArray;
      
    }
    else if(selectUpdateType==="article")
    {
      this.secondDropDownArray=this.articleArray;
    }

    console.log("SELECTED",this.secondDropDownArray);
  }

  searchKeyword(searchString) {
    console.log("SEARCH_HIT");

    if (searchString) {
      this.http.get(this.ApiserviceService.BASE_URL+'internal/index?token=' + this.access_token + '&limit=' + 1000 + "&search=" + searchString).subscribe(data => {
        this.internalUpdateList = data.json().docs;
        this.pager.pageSize = data.json().limit;
        this.pager.totalItems = data.json().total;
        this.setPage();
        console.log("URL_DATA",this.internalUpdateList);
      });
    }
    else {
      console.log("SEARCH_EMPTY");
      this.internalUpdateList = this.backupInternalList;
      this.pager=this.backupInternalPager;
    }
  }
  

}
