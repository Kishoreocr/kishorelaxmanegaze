import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
data:any[]=[{"id":"tab1","key":"dddddd1111","va":"yes1"},{"id":"tab11","key":"dddddd22221","va":"yes"}];
  constructor() { }

  ngOnInit() {
  }

}
