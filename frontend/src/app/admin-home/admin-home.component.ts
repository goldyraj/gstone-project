import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  access_token;
  usersCount;
  vendorsCount;
  customersCount;
  branchesCount;

  constructor(private router: Router, public http: Http) {

  }

  onLoad() {
    this.access_token = localStorage.getItem('admin_token');
    this.getUsersCount();
    this.getBranchesCount();
    this.getCustomersCount();
    this.getVendorsCount();
  }

  ngOnInit() {
    var context = this;
    if (localStorage.getItem('admin_token')) {
      context.onLoad();
    }
    else {
      context.router.navigate(['/admin-login']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }

  getUsersCount() {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/user/index?token=' + this.access_token + '&limit=' + 1000, options)
      .subscribe(
      response => {
        this.usersCount = [];
        this.usersCount = response.json().docs;
        return this.usersCount.length;
      },
      error => {
        console.log(error.text());
      }
      );
  }

  preventUrlNavigation() {

  }

  getVendorsCount() {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/vendor/index?token=' + this.access_token + '&limit=' + 1000, options)
      .subscribe(
      response => {
        this.vendorsCount = [];
        this.vendorsCount = response.json().docs;
        return this.vendorsCount.length;
      },
      error => {
        console.log(error.text());
      }
      );
  }

  getBranchesCount() {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/branch/index?token=' + this.access_token + '&limit=' + 1000, options)
      .subscribe(
      response => {
        this.branchesCount = [];
        this.branchesCount = response.json().docs;
        return this.branchesCount.length;
      },
      error => {
        console.log(error.text());
      }
      );
  }

  getCustomersCount() {
    let response: any;
    let myHeaders = new Headers({ 'Content-Type': 'application/json' });
    myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    let options = new RequestOptions({ headers: myHeaders });

    this.http.get('http://localhost:3000/api/customer/index?token=' + this.access_token + '&limit=' + 1000, options)
      .subscribe(
      response => {
        this.customersCount = [];
        this.customersCount = response.json().docs;
        return this.customersCount.length;
      },
      error => {
        console.log(error.text());
      }
      );
  }

}
