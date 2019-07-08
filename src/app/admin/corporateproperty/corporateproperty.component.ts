import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EgazeService } from '../../services/egaze.service';
import { SessionstorageService } from '../../services/sessionstorage.service';

@Component({
  selector: 'app-corporateproperty',
  templateUrl: './corporateproperty.component.html',
  styleUrls: ['./corporateproperty.component.css']
})
export class CorporatepropertyComponent implements OnInit {

  firstFormStep: boolean = true;
  secondFormStep: boolean = false;
  thirdFormStep: boolean = false;
  fourthFormStep: boolean = false;
  propertyForm: FormGroup;
  companies: any = [];
  companyusers: any = [];
  psubmitted = false;
  isLoaderdiv: boolean = false;
  user: any;
  companyuseremail: any;
  propertyStatus = "";
  constructor(private formBuilder: FormBuilder, private EgazeService: EgazeService, private sessionstorageService: SessionstorageService) {

    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    //alert(JSON.stringify(this.user));
  }

  ngOnInit() {

    this.propertyForm = this.formBuilder.group({
      typeofProperty: ['', Validators.required],
      titleHolder: ['', [Validators.required, Validators.minLength(2)]],
      relationshipTocustomer: ['', Validators.required],
      surveyNoDrNo: ['', [Validators.required, Validators.minLength(6)]],
      subRegisterOffice: ['', Validators.minLength(6)],
      extentofProperty: ['', Validators.required],
      boundaries: [''],
      boundariesNorth: ['', Validators.minLength(3)],
      boundariesSouth: ['', Validators.minLength(3)],
      boundariesEast: ['', Validators.minLength(3)],
      boundariesWest: ['', Validators.minLength(3)],
      documentNo: ['', Validators.required],
      address1: ['', [Validators.required, Validators.minLength(6)]],
      address2: ['', [Validators.required, Validators.minLength(6)]],
      villageCity: ['', Validators.required],
      mandal: ['', Validators.required],
      district: ['', Validators.required],
      zip: ['', [Validators.required, Validators.minLength(4)]],
      state: ['', Validators.required],
      caseno: ['', [Validators.required, Validators.minLength(3)]],
      fir: ['', [Validators.required, Validators.minLength(3)]],
      pao: ['', [Validators.required, Validators.minLength(3)]],
      ioname: ['', [Validators.required, Validators.minLength(3)]],
      zheadname: ['', [Validators.required, Validators.minLength(3)]],
      rheadname: ['', [Validators.required, Validators.minLength(3)]],
      zone: ['', [Validators.required, Validators.minLength(3)]],
      company: ['', Validators.required],
      companyuser: ['', Validators.required],
      cmpName: [null],
      cmpUserEmail: [null]
      // caseno: ['',[Validators.required, Validators.minLength(3)]],
    });

    if (this.user.role === 'corporateadmin') {
      this.propertyForm.controls['company'].setValue(this.user.companyCode);
      this.propertyForm.controls['cmpName'].setValue(this.user.company);
      this.getCompanyUser(this.user.companyCode);
    }
    if (this.user.role === 'admin') {

      this.EgazeService.getCompanies().subscribe(result => {
        this.companies = [];
        this.companies = result;
      });
    }
  }
  get f() { return this.propertyForm.controls; }

  getType(event) {
    this.propertyForm.value.typeofProperty = "" + event;
    //alert(this.updateuserNewpwdForm.value.typeofProperty);
  }
  getreltionType(event) {
    this.propertyForm.value.relationshipTocustomer = "" + event;
    //alert(this.updateuserNewpwdForm.value.typeofProperty);
  }
  getZone(event) {
    this.propertyForm.value.zone = "" + event;
  }
  districts: any = [];
  getDistricts(stateCode) {
    this.EgazeService.getDistricts(stateCode).subscribe(result => {
      // debugger;
      this.districts = result;
    }, error => {

    });

  }
  mandals: any = [];
  getMandals(stateCode, districtCode) {
    this.EgazeService.getMandals(stateCode, districtCode).subscribe(result => {
      //debugger;
      this.mandals = result;
    }, error => {

    });

  }
  villages: any = [];
  getVillages(stateCode, districtCode, mandalCode) {

    this.EgazeService.getVillages(stateCode, districtCode, mandalCode).subscribe(result => {
      //debugger;
      this.villages = result;
    }, error => {

    });

  }
  getCompanyUser(evnt) {
    // this.propertyForm.value.companyuser = "" + event;
    if (this.user.role === 'admin') {
      let mob = "" + evnt;
      let mobi = mob.split("$$");
      this.propertyForm.controls['company'].setValue(mobi[0]);
      this.propertyForm.controls['cmpName'].setValue(mobi[1]);
      this.getCompanyUsers("" + mobi[0]);
    }
    if (this.user.role === 'corporateadmin') {
      
      this.getCompanyUsers("" + evnt);
    }
    

  }
  getCompanyUsers(code) {

    this.EgazeService.getCompanyUsers(code).subscribe(result => {
      this.companyusers = [];
      this.companyusers = result;
    });
  }
  getCompanyUseremail(evnt) {
    let ema = "" + evnt;
    let emai = ema.split("$$");

    this.propertyForm.value.companyuser = emai[0];
    this.propertyForm.value.cmpUserEmail = emai[1];
    this.companyuseremail = emai[1];
    //alert(this.companyuseremail +" --- "+this.propertyForm.value.companyuser)
  }
  getstate(event) {
    this.propertyForm.value.state = "" + event;
    this.propertyForm.value.district = "";
    this.getDistricts("" + event);
    //alert(event);
  }
  getdistrict(event) {
    this.propertyForm.value.district = "" + event;
    this.propertyForm.value.mandal = "";
    this.getMandals(this.propertyForm.value.state, "" + event);
  }
  getmandal(event) {
    this.propertyForm.value.mandal = "" + event;
    this.propertyForm.value.villageCity = "";
    this.getVillages(this.propertyForm.value.state, this.propertyForm.value.district, "" + event);
  }
  getvillage(event) {
    this.propertyForm.value.villageCity = "" + event;
  }
  isCharts(event) {
    if ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8 || event.charCode === 32)
      return true;
    else {
      return false;
    }
  }

  addPropertyFun(objProperty) {
    debugger;
    //alert(JSON.stringify(this.propertyForm.value))
    event.stopPropagation();
    if (this.propertyForm.controls.typeofProperty.valid
      && this.propertyForm.controls.titleHolder.valid
      && this.propertyForm.controls.relationshipTocustomer.valid
      && this.propertyForm.controls.surveyNoDrNo.valid
      && this.propertyForm.controls.documentNo.valid
      && this.propertyForm.controls.extentofProperty.valid && this.firstFormStep) {

      this.psubmitted = false;

      this.firstFormStep = false;
      this.secondFormStep = true;
      this.thirdFormStep = false;
      this.fourthFormStep = false;
    }
    else if (this.propertyForm.controls.subRegisterOffice.valid
      && this.propertyForm.controls.boundariesNorth.valid
      && this.propertyForm.controls.boundariesSouth.valid
      && this.propertyForm.controls.boundariesEast.valid
      && this.propertyForm.controls.boundariesWest.valid
      && this.secondFormStep) {
      debugger;
      this.psubmitted = false;

      this.firstFormStep = false;
      this.secondFormStep = false;
      this.thirdFormStep = true;
      this.fourthFormStep = false;
    }


    else if (this.propertyForm.controls.address1.valid
      && this.propertyForm.controls.villageCity.valid
      && this.propertyForm.controls.mandal.valid
      && this.propertyForm.controls.district.valid
      && this.propertyForm.controls.zip.valid
      && this.propertyForm.controls.state.valid
      && this.thirdFormStep) {
      this.psubmitted = false;

      this.firstFormStep = false;
      this.secondFormStep = false;
      this.thirdFormStep = false;
      this.fourthFormStep = true;

    } else if (this.propertyForm.controls.caseno.valid
      && this.propertyForm.controls.fir.valid
      && this.propertyForm.controls.pao.valid
      && this.propertyForm.controls.ioname.valid
      && this.propertyForm.controls.zheadname.valid
      && this.propertyForm.controls.rheadname.valid
      && this.propertyForm.controls.zone.valid
      && this.propertyForm.controls.company.valid
      && this.propertyForm.controls.companyuser.valid) {

      this.psubmitted = false;
      //alert(this.propertyForm.controls.company)
      //alert(" --- "+this.propertyForm.value.company)

      // if (this.user.role === 'corporateadmin') {
      //   this.propertyForm.controls['cmpName'].setValue(this.user.company);
      // }
      //alert(JSON.stringify(objProperty.value))
      this.firstFormStep = false;
      this.secondFormStep = false;
      this.thirdFormStep = false;
      this.fourthFormStep = true;
      this.isLoaderdiv = true;
      this.EgazeService.addPropertycorporate(objProperty.value, this.user.loginId, this.companyuseremail, this.propertyForm.value.companyuser).subscribe(
        result => {
          this.isLoaderdiv = false;
          console.log(result);
          if (typeof result === "object") {
            if (this.user.role === 'admin') {
              this.propertyStatus = "Property added Successfully.Please click on 'Property Approval' tab to view your property.";
            } else if (this.user.role === 'corporateadmin') {
              this.propertyStatus = "Property added Successfully.Please click on 'Reports' tab to view your property.";
            }

            this.propertyForm.reset();
            this.propertyForm.controls['typeofProperty'].setValue("");
            this.propertyForm.controls['relationshipTocustomer'].setValue("");
            this.propertyForm.controls['state'].setValue("");
            this.propertyForm.controls['district'].setValue("");
            this.propertyForm.controls['mandal'].setValue("");
            this.propertyForm.controls['villageCity'].setValue("");
            this.propertyForm.controls['company'].setValue("");
            this.propertyForm.controls['companyuser'].setValue("");
            this.psubmitted = false;
            //this.propertiesShow();
            //this.getPropertiesCount();
            //this.getTransactions();

            // this.propertyDocuments = true;
            // this.propertyDetails = true;
            this.firstFormStep = true;
            this.secondFormStep = false;
            this.thirdFormStep = false;
            this.fourthFormStep = false;
          }
        },
        error => {
          console.log(error);
          this.isLoaderdiv = false;
        }

      );

    }
    else {
      this.psubmitted = true;
    }

  }

  PreviousForm(PreviousForm) {
    if (PreviousForm === 'FirstForm') {
      this.firstFormStep = true;
      this.secondFormStep = false;
      this.thirdFormStep = false;
      this.fourthFormStep = false;
    }
    if (PreviousForm === 'SecondForm') {
      this.firstFormStep = false;
      this.secondFormStep = true;
      this.thirdFormStep = false;
      this.fourthFormStep = false;
    }
    if (PreviousForm === 'ThirdForm') {
      this.firstFormStep = false;
      this.secondFormStep = false;
      this.thirdFormStep = true;
      this.fourthFormStep = false;
    }

  }

}
