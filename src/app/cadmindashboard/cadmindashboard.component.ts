import { Component, OnInit } from '@angular/core';
import { SessionstorageService } from '../services/sessionstorage.service';
import { EgazeService } from '../services/egaze.service';
import { ModalService } from '../admin/service/modal.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ModalPropertyService } from '../services/modal-property.service';

export interface PropertyDoc {
  pdoc: String;
  downoladUrl: String;
}
@Component({
  selector: 'app-cadmindashboard',
  templateUrl: './cadmindashboard.component.html',
  styleUrls: ['./cadmindashboard.component.css']
})
export class CadmindashboardComponent implements OnInit {
  user: any;
  userproperties: any = [];
  propertyForm1: FormGroup;
  isLoading: boolean;
  documentGrp: FormGroup;
  propertydocs: any;
  commentForm: FormGroup;
  commentsmsg: any;


  constructor(private ModalPropertyService: ModalPropertyService, private formBuilder: FormBuilder, private sessionstorageService: SessionstorageService, private EgazeService: EgazeService, private modalService1: ModalService) {
    this.user = JSON.parse(this.sessionstorageService.getUserDetails() + "");
    //alert(JSON.stringify(this.user))
  }

  ngOnInit() {
    this.custproperties();
    this.propertyForm1 = this.formBuilder.group({
      propertyType: ['', Validators.required],
      propertyHolderName: ['', [Validators.required, Validators.minLength(2)]],
      relationship: ['', Validators.required],
      doorNo: ['', [Validators.required, Validators.minLength(6)]],
      documentNo: ['', Validators.required],
      boundariesEast: ['', [Validators.minLength(3)]],
      boundariesWest: ['', [Validators.minLength(3)]],
      boundariesNorth: ['', [Validators.minLength(3)]],
      boundariesSouth: ['', [Validators.minLength(3)]],
      mandal: ['', Validators.required],
      district: ['', Validators.required],
      subRegisterOffice: ['', [Validators.minLength(6)]],
      extentOfProperty: ['', Validators.required],
      address1: ['', [Validators.required, Validators.minLength(6)]],
      address2: ['', [Validators.required, Validators.minLength(6)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.minLength(4)]],
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
      // country: ['', Validators.required]
    });

    this.commentForm = this.formBuilder.group({
      commentfield: ['', [Validators.required, Validators.minLength(3)]],
      typeofProperty: ['', Validators.required],
      commentfile: [null]
    });

    this.commentForm.controls['typeofProperty'].setValue("nochanges");
    this.documentGrp = this.formBuilder.group({
      file: [null, Validators.required]

    });

  }
  get c() {
    return this.commentForm.controls;
  }

  reportsTab = true;
  userTab = false;
  corporatepropertyTab = false;
  userdashTabs(activeTab) {

    //this.activeSelected = true;
    switch (activeTab) {
      case 'reports':
        this.reportsTab = true;
        this.userTab = false;
        this.corporatepropertyTab = false;
        break;
      case 'corporateuser':
        this.reportsTab = false;
        this.userTab = true;
        this.corporatepropertyTab = false;
        break;
      case 'corporateproperty':
        this.reportsTab = false;
        this.userTab = false;
        this.corporatepropertyTab = true;
        break;
      default:
        this.reportsTab = true;
        this.userTab = false;
    }

  }
  custproperties() {
if(this.user.role==='corporateadmin'){
  this.EgazeService.getCorporateProperties(this.user.companyCode).subscribe(
    result => {
      //debugger;
      this.userproperties = result;
    },
    error => { }
  );
}else{
  this.EgazeService.getAllproperties(this.user.loginId).subscribe(
    result => {
      //debugger;
      this.userproperties = result;
    },
    error => { }
  );
}
    

  }
  propertytabModal: boolean = false;
  documentstabModal: boolean = false;
  commentstabModal: boolean = false;
  isEditDisabled: boolean = false;

  userdashTabs1(activeTab) {
    //this.updateuserProfilestatus = "";
    //this.activeSelected = true;
    switch (activeTab) {

      case 'PropertyDetailsTab':
        this.propertytabModal = true;
        this.documentstabModal = false;
        this.commentstabModal = false;
        this.isEditDisabled = false;
        // this.getPropertyDetails();
        // this.propertyDetails = true;
        // this.propertyDocuments = false;

        break;
      case 'DocumentsTab':
        this.propertytabModal = false;
        this.documentstabModal = true;
        this.commentstabModal = false;
        this.isEditDisabled = false;
        // this.propertyDetails = false;
        //this.propertyDocuments = true;

        this.getPrpopertyDocs();

        break;
      case 'CommentsTab':
        this.propertytabModal = false;
        this.documentstabModal = false;
        this.commentstabModal = true;
        this.isEditDisabled = false;
         this.getPrpopertyComments();
        break;
      default:
        this.commentstabModal = false;
        this.documentstabModal = false;
        this.propertytabModal = true;
    }
  }
  submitted: boolean = false;
  updateuserProfilestatus = "";
  property: any;
  loginId: any;
  propertyId: any;
  propertystatus: any;
  companies: any = [];
  openModal(id: string, cust) {

    this.submitted = false;
    this.propertytabModal = true;
    this.documentstabModal = false;
    this.commentstabModal = false;
    this.updateuserProfilestatus = '';
    // this.customer = cust;
    this.property = cust;
    //alert(this.property.company!==null && this.property.company!=='')
    this.ModalPropertyService.open(id);

    this.isEditDisabled = false;
    this.loginId = this.property.loginId;
    this.propertyId = this.property.id;
    this.propertystatus = this.property.status;
    this.getDistricts(this.property.state);
    this.getMandals(this.property.state, this.property.district);
    this.getVillages(this.property.state, this.property.district, this.property.mandal);
    this.EgazeService.getCompanies().subscribe(result => {
      this.companies = [];
      this.companies = result;
    });

    this.getCompanyUsers(this.property.company)
    // alert(JSON.stringify(this.property))
    //this.iscorporate=true;
    this.propertyForm1.setValue({
      propertyType: this.property.propertyType,
      propertyHolderName: this.property.propertyHolderName,
      relationship: this.property.relationship,
      doorNo: this.property.doorNo,
      documentNo: this.property.documentNo,
      // boundaries: "boundaries",
      boundariesEast: this.property.boundariesEast,
      boundariesWest: this.property.boundariesWest,
      boundariesNorth: this.property.boundariesNorth,
      boundariesSouth: this.property.boundariesSouth,
      mandal: this.property.mandal,
      district: this.property.district,
      subRegisterOffice: this.property.subRegisterOffice,
      extentOfProperty: this.property.extentOfProperty,
      address1: this.property.address1,
      address2: this.property.address2,
      city: this.property.city,
      state: this.property.state,
      zip: this.property.zip,
      caseno: this.property.caseNo,
      fir: this.property.fir,
      pao: this.property.pao,
      ioname: this.property.ioName,
      zheadname: this.property.zHeadName,
      rheadname: this.property.rHeadName,
      zone: this.property.zone,
      company: this.property.company + '$$' + this.property.cmpName,
      companyuser: this.property.companyUser + '$$' + this.property.cmpUserEmail,
      cmpName: this.property.cmpName,
      cmpUserEmail: this.property.cmpUserEmail
      //  country: this.property.country
      // status: this.property.status

    });


  }

  closeModal(id: string) {
    this.ModalPropertyService.close(id);
  }

  getstate(event) {
    this.propertyForm1.value.state = "" + event;
    this.propertyForm1.value.district = "";
    this.getDistricts("" + event);
    //alert(this.updateuserNewpwdForm.value.typeofProperty);
  }
  getdistrict(event) {
    this.propertyForm1.value.district = "" + event;
    this.propertyForm1.value.mandal = "";
    this.getMandals(this.propertyForm1.value.state, "" + event);
  }
  getmandal(event) {
    this.propertyForm1.value.mandal = "" + event;
    this.propertyForm1.value.villageCity = "";
    this.getVillages(this.propertyForm1.value.state, this.propertyForm1.value.district, "" + event);
  }
  getvillage(event) {
    this.propertyForm1.value.villageCity = "" + event;
  }
  getZone(event) {
    this.propertyForm1.value.zone = "" + event;
  }
  companyusers: any = [];
  getCompanyUser(evnt) {
    //alert(evnt)
    if ("" + evnt === '') {
      this.companyusers = [];
    } else {
      let mob = "" + evnt;
      let mobi = mob.split("$$");
      // this.propertyForm.value.companyuser = "" + event;
      this.getCompanyUsers("" + mobi[0]);
    }

  }
  getCompanyUsers(code) {
    this.EgazeService.getCompanyUsers(code).subscribe(result => {
      this.companyusers = [];
      this.companyusers = result;
    });
  }
  // companyuseremail:any;
  // getCompanyUseremail(evnt) {
  //   let ema = "" + evnt;
  //   let emai = ema.split("$$");
  //   this.propertyForm1.value.companyuser = emai[0];
  //   this.propertyForm1.value.cmpUserEmail = emai[1];
  //   //this.companyuseremail = emai[1];
  //   //alert(this.companyuseremail +" --- "+this.propertyForm.value.companyuser)
  // }
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
  profileeditFun() {
    this.isEditDisabled = !this.isEditDisabled;
    this.submitted = false;
  }
  errorMsg: any;
  updatepropertyFun(propertyForm1) {
    if (!this.isEditDisabled) {
      this.submitted = false;
    }
    else {
      this.submitted = true;
    }

    this.errorMsg = '';
    //alert(JSON.stringify(this.propertyForm1.value))
    if (this.propertyForm1.valid) {
      this.isLoading = true;
      //alert("dsdd")

      this.EgazeService.updatePropertybyAdmin(propertyForm1.value, this.loginId, this.propertyId, this.property.status).subscribe(result => {
        this.isLoading = false;
        //alert("dsdd="+result)

        this.updateuserProfilestatus = "Property updated Successfully";
        this.isEditDisabled = false;
        this.isLoading = false;
        this.custproperties();
        // alert("suss"+this.updateuserProfilestatus)
      }, error => {
        this.isLoading = false;
        // alert("suss="+JSON.stringify(error));

        this.errorMsg = 'Server error has been occurred. Please try later.';
      });
    }
  }




  /*file*/
  public totalfiles: Array<File> = [];
  public totalFileName = [];
  public lengthCheckToaddMore = 0;
  items: Array<PropertyDoc> = [];
  sfile: File;
  importfile(event: any, i) {
    const [file] = event.target.files;
    if (event.target.files && event.target.files.length) {
      this.sfile = file;
    }
  }

  fileSelectionEvent(i) {
    if (this.sfile != null) {
      const file = this.sfile;
      if (file.type === "application/pdf" || file.type.match("image")) {
        if (file.size <= 4194304) {
          this.isLoading = true;
          if (this.property != null) {
            this.propertyId = this.property.id;
          }
          this.EgazeService.savePropertyDoc(this.sfile, this.propertyId, this.loginId).subscribe(result => {
            this.isLoading = false;
            this.sfile = null;
            this.getPrpopertyDocs();
            this.documentGrp.controls['file'].setValue("");

          }, error => {
            //            alert(JSON.stringify(error));
          });
        } else {
          alert("Please choose < 4MB Documents");
          this.documentGrp.controls['file'].setValue("");
        }
      } else {
        alert("Please choose images/pdf");
        this.documentGrp.controls['file'].setValue("");
      }
    } else {
      alert("Please choose the file");
      this.documentGrp.controls['file'].setValue("");

    }
  }


  addItem(): void {
    var lemtn: any = false;
    this.items.forEach(element => {
      if (element.downoladUrl === '') {
        lemtn = true;
        return false

      }
      return true;
    });
    if (lemtn) {
      alert("Please upload the file and then choose Add more")
    } else {
      if (this.lengthCheckToaddMore <= 14) {
        this.lengthCheckToaddMore = this.lengthCheckToaddMore + 1;
        this.items.push({ "pdoc": this.lengthCheckToaddMore + "", "downoladUrl": "" });
      } else {
        alert("You can choose maximum of 15 documents")
      }

    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    //alert(JSON.stringify(this.items))
    this.lengthCheckToaddMore = this.lengthCheckToaddMore - 1;
  }
  getPrpopertyDocs() {
    this.isLoading = true;
    this.items = [];
    this.EgazeService.getPrpopertyDocs(this.propertyId).subscribe(result => {
      this.propertydocs = result;
      this.isLoading = false;
      //this.sfile = null;
    }, error => {
      alert(JSON.stringify(error));
    });
  }
  viewur: any = this.EgazeService.getPropertyDocViewURL();

  viewcommentur: any = this.EgazeService.getPropertyCommentDocViewURL();
  comments: any = [];
  getPrpopertyComments() {
    this.EgazeService.getPrpopertyComments(this.propertyId).subscribe(result => {

      this.comments = result;
      // alert('success' + this.commentsmsg);

    }, error => {
      //alert('error' + error);
    });
  }
  fileSelectionEventcomments(event: any) {
    const reader = new FileReader();
    const [file] = event.target.files;
    if (event.target.files && event.target.files.length) {
      this.sfile = file;
    }
    if (this.sfile != null) {
      const file = this.sfile;
      if (file.type === "application/pdf" || file.type.match("image")) {
        if (file.size <= 4194304) {
          reader.readAsDataURL(file);
          //this.isLoading = true;

        } else {
          alert("Please choose < 4MB Documents")
          this.commentForm.controls['commentfile'].setValue("");
        }
      } else {
        alert("Please choose images/pdf")
        this.commentForm.controls['commentfile'].setValue("");

      }
    } else {
      alert("Please choose the file");
      this.commentForm.controls['commentfile'].setValue("");
    }
  }
  usr: any;
  usrid:any;
  commentFun(description) {
    this.submitted = true;
    //alert(this.propertyId)
    if (this.user.role === 'corporateadmin') {
      this.usr = 'Corporate Admin';
      this.usrid="0";
    } else {
      this.usr = 'Corporate User';
      this.usrid=this.user.loginId;
    }
    if (this.commentForm.valid) {
      this.isLoading = true;
      this.EgazeService.savePropertyComments(this.propertyId, this.usrid, this.user.loginId, this.usr, description.value.commentfield, description.value.typeofProperty, this.sfile).subscribe(result => {
        this.isLoading = false;

        this.commentsmsg = result;
        if (this.commentsmsg) {
          this.submitted = false;
          this.commentForm.controls['commentfile'].setValue("");
          this.commentForm.controls['commentfield'].setValue("");
          this.sfile = null;
        }
        this.getPrpopertyComments();
      }, error => {
      });


    }
  }
  getporpertyCommentdocDownloadUrl(id) {
    window.location.href = this.EgazeService.getPropertyCommentDocURL(id);
  }

}
