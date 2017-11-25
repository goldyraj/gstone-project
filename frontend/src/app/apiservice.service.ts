import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ApiserviceService {

  // public BASE_URL="http://localhost:3000/api/";
  public BASE_URL="http://165.227.183.172:3000/api/";
  constructor(public http: Http) { }
}
