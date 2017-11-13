import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gstupdate-detail',
  templateUrl: './gstupdate-detail.component.html',
  styleUrls: ['./gstupdate-detail.component.css']
})
export class GstupdateDetailComponent implements OnInit {
  id: number;
  private sub: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      console.log("recived id",this.id);
      console.log("recived id",params);

      // In a real app: dispatch action to load the details here.
   });
  }

}
