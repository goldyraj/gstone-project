import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }

  getUsersCount()
  {
    
  }

}
