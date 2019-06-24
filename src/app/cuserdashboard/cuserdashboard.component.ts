import { Component, OnInit } from '@angular/core';
import { SessionstorageService } from '../services/sessionstorage.service';

@Component({
  selector: 'app-cuserdashboard',
  templateUrl: './cuserdashboard.component.html',
  styleUrls: ['./cuserdashboard.component.css']
})
export class CuserdashboardComponent implements OnInit {user:any;
  constructor(private sessionstorageService: SessionstorageService) {
    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    //alert(JSON.stringify(this.user))
   }

  ngOnInit() {
  }

}
