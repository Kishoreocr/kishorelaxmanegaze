import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  data: any[] = [{ "id": "tab1", "key": "I cannot find a package that suits me", "va": "Please select custom package and our Admin team will work with you to create a suitable package based on your requirements" }, 
  { "id": "tab2", "key": "Do you offer management services?", "va": "Management services will be provided upon request" }];
  constructor() { }

  ngOnInit() {
  }

}
