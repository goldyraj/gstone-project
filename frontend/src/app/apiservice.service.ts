import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ApiserviceService {

  public BASE_URL="";
  constructor(public http: Http) { }
  

}
