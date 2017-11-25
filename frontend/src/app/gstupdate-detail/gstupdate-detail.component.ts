import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-gstupdate-detail',
  templateUrl: './gstupdate-detail.component.html',
  styleUrls: ['./gstupdate-detail.component.css'],
  providers:[ApiserviceService]
})
export class GstupdateDetailComponent implements OnInit {
  id: number;
  private sub: any;
  GstUpdateDetails = "";
  constructor(private route: ActivatedRoute,public http: Http,public apiserviceService: ApiserviceService) { 
    // this.getInternalUpdateList();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      console.log("recived id",this.id);
      console.log("recived id",params);
      this.getInternalUpdateList(this.id);
      // In a real app: dispatch action to load the details here.
   });
  }

  getInternalUpdateList(id) {
    console.log('list called');
    var url =this.apiserviceService.BASE_URL+'internal/view/'+id;
    console.log("url",url);
    this.http.get(url).subscribe(data => {
      this.GstUpdateDetails = data[0].json().internal;
      console.log("GstUpdateDetails", this.GstUpdateDetails);
    });
  }

}
