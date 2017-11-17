import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router: Router,public http:Http) {
    
  }

  onLoad()
  {
   
  }

  ngOnInit() {
    var context=this;
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

  }

  preventUrlNavigation() {

  }

  getVendorsCount()
  {

  }

  getBranchesCount()
  {

  }

  // getBranches(page: number) {
    
  //   let response: any;
  //   let myHeaders = new Headers({ 'Content-Type': 'application/json' });
  //   // myHeaders.append('x-access-token', access_token);
  //   myHeaders.append('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-access-token');
  //   myHeaders.append('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
  //   myHeaders.append('Access-Control-Allow-Origin', '*');
  //   // headers.append('Accept','charset=utf-8');
  //   myHeaders.append('Access-Control-Allow-Credentials', 'true');

  //   let options = new RequestOptions({ headers: myHeaders });

  //   this.http.get('http://localhost:3000/api/branch/index?token=' + this.access_token + '&page=' + this.pager.currentPage + '&limit=' + 5, options)
  //     .subscribe(
  //     response => {

  //       console.log("BRANCH_LIST_API_RESPONSE_2", response.json().docs);
  //       this.branchesList = response.json().docs;
  //     },
  //     error => {
  //       // alert(error.text());
  //       console.log(error.text());
  //     }
  //     );
  // }

}
