import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-gstr-1',
  templateUrl: './gstr-1.component.html',
  styleUrls: ['./gstr-1.component.css']
})
export class Gstr1Component implements OnInit {
page = 1;
  finyear=[
    'Financial Year',
    '2016-2017',
    '2017-2018',
    '2018-2019',
    '2019-2020',
    '2020-2021'
  ]

  Month=[
    'Month',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Augs',
    'Dept',
    'Oct',
    'Nov',
    'Dec'
  ]

  Invoice=[
    'Invoice Filter',
    'Show All',
    'Show Normal Sales',
    'Show RC Sales',
    'Show E-com Sales',
    'Show Debit Notes',
    'Show Credits Notes'
  ]

  Filter=[
    'Filing Filter',
    'Not Uploaded',
    'Uploaded',
    'Filed'
  ]

  constructor(
  private route: ActivatedRoute,
  private router: Router
) {}

  ngOnInit() {
  }
 currentOrientation = 'horizontal';

 gotoHeroes()
 {
   this.router.navigate(['/newinvoice']);
 }
}
