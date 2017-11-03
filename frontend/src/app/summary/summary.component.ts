import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
