import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService, IModalDialogButton } from 'ngx-modal-dialog';
import { PackageconfirmComponent } from '../packageconfirm/packageconfirm.component'
import { EgazeService } from '../services/egaze.service';
import { ModalPropertyService } from '../services/modal-property.service';
import { SessionstorageService } from '../services/sessionstorage.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  MONTHLY: boolean = false;
  YEARLY: boolean = false;
  CUSTOM: boolean = false;
  activeflag: boolean = false;
  modalService: any;
  viewRef: any;
  isLoading: boolean = true;
  packages: any;
  selectedPlan: string = '';
  user: any;
  selectedPlanId: any;
  monitoring:any;
  additional:any;

  constructor(private router: Router, modalService: ModalDialogService, viewRef: ViewContainerRef, private EgazeService: EgazeService, private ModalPropertyService: ModalPropertyService, private sessionstorageService: SessionstorageService) {
    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    if (this.user != null && this.user.role === 'customer') {
      this.activeflag = true;
    }
    this.modalService = modalService;
    this.viewRef = viewRef;
    this.EgazeService.getPackages().subscribe(
      result => {
        this.isLoading = false;
        this.packages = result;

      }

    );


  }

  ngOnInit() {
    this.YEARLY = true;
    this.monitoring = true;
    //window.location.reload(true);
  }
  addActiveClass(id) {
    //alert(id+"")
    return {
      'active-package-tab': id
    };
  }
  packageFun(selected, id, mid) {

    if (selected === 'YEARLY' || selected === 'QUATERLY') {
      //this.router.navigateByUrl('/payment?package='+id);
      window.location.href = '/payment?package=' + id;
    }

    if (selected === 'CUSTOM') {
      this.openModal(mid, selected + "$$" + id);
    }
  }
  loginformFun(){
    window.location.href = '/loginform';
  }

  plansTabFun(active) {
    //this.activeSelected = true;
    switch (active) {
      case 'MONTHLY':
        this.MONTHLY = true;
        this.YEARLY = false;
        this.CUSTOM = false;
        break;
      case 'YEARLY':
        this.MONTHLY = false;
        this.YEARLY = true;
        this.CUSTOM = false;
        break;
      case 'CUSTOM':
        this.MONTHLY = false;
        this.YEARLY = false;
        this.CUSTOM = true;
        break;
      default:

        this.YEARLY = true;

    }

  }

  openNewDialog(selected, id) {
    //alert(selected + "$$" + id)
    this.modalService.openDialog(this.viewRef, {
      title: 'Confirm Plan choosen?',
      childComponent: PackageconfirmComponent,
      data: selected + "$$" + id, settings: { modalClass: 'modal fade ngx-modal blue' }
    });
  }
  openModal(id: string, property) {
    var prop = property.split("$$");
    this.selectedPlan = prop[0]
    this.selectedPlanId = prop[1];
    this.ModalPropertyService.open(id);
  }

  closeModal(id: string) {
    this.ModalPropertyService.close(id);
  }
  confirmPackage() {
    let data1 = {
      "loginId": this.user.loginId,
      "email": this.user.email,
      "packageId": this.selectedPlanId,
      "type": this.user.type

    }
    //alert(this.user.email);
    this.isLoading = true;

    this.EgazeService.customerpackage(data1).subscribe(
      result => {
        if (result == true) {
          this.isLoading = false;
          this.router.navigateByUrl('/userdashboard');

        }
      }

    );
  }
  tabshow(tabs){
   if(tabs === 'monitoring'){
   this.monitoring = true;
   this.additional = false;
   }
   else{
     this.monitoring = false;
     this.additional = true;

   }

  }
}
