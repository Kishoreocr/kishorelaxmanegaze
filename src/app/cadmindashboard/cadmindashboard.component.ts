import { Component, OnInit } from '@angular/core';
import { SessionstorageService } from '../services/sessionstorage.service';

@Component({
  selector: 'app-cadmindashboard',
  templateUrl: './cadmindashboard.component.html',
  styleUrls: ['./cadmindashboard.component.css']
})
export class CadmindashboardComponent implements OnInit {
user:any;
  constructor(private sessionstorageService: SessionstorageService) {
    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    //alert(JSON.stringify(this.user))
   }

  ngOnInit() {
  }
  reportsTab=true;
  userTab=false;
  userdashTabs(activeTab) {
   
    //this.activeSelected = true;
    switch (activeTab) {
      case 'reports':
        this.reportsTab = true;
        this.userTab = false;
        break;
      case 'corporateuser':
      this.reportsTab = false;
      this.userTab = true;
        break;
     default:
      this.reportsTab = true;
      this.userTab = false;
    }

  }

}
