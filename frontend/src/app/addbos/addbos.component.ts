import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-addbos',
  templateUrl: './addbos.component.html',
  styleUrls: ['./addbos.component.css'],
  providers:[ApiserviceService]
})

export class AddbosComponent implements OnInit {

  ngOnInit()
  {
    
  }
}
