import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router: Router ) {
    
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

}
