import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService } from 'ngx-modal-dialog';
import { MessagemodalpopupComponent } from '../messagemodalpopup/messagemodalpopup.component'
import { EgazeService } from '../services/egaze.service';
import { LoadingDivComponent } from '../loading-div/loading-div.component';
import { ModalPropertyService } from '../services/modal-property.service';
import { interval } from 'rxjs/observable/interval';
import { ReCaptcha2Component } from 'ngx-captcha'

@Component({
  selector: 'app-corporateregister',
  templateUrl: './corporateregister.component.html',
  styleUrls: ['./corporateregister.component.css']
})
export class CorporateregisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  submitted1 = false;
  modalService: any;
  viewRef: any;
  loading: string;
  existsUser: string;
  isLoading: boolean;
  termsCheckederrors: any = '';
  mobileNumbererror: boolean = false;
  country: any = "";
  countryCode: any = "";
  flag=false;


  isie: any = false;

  errorMessage: any;
  errorValidation: string;
  timerOn = true;
  resend: any = false;
  siteKey = "6Lesto4UAAAAAKLdXIngWkCCJ3vouN4ZqngQERtp";
  size: any = "normal";
  lang: any = "en";
  theme: any = "light";//Light
  type: any = "image";
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, modalService: ModalDialogService, viewRef: ViewContainerRef, private EgazeService: EgazeService, private ModalPropertyService: ModalPropertyService) {

    this.modalService = modalService;
    this.viewRef = viewRef;


  }
  isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.charCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }

  isCharts(event) {
    if ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8) {
      return true;
    } else {
      return false;
    }
  }

  // allow the space in register form for name field.

  isChartsName(event) {
    if ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8 || event.charCode == 32) {
      return true;
    } else {
      return false;
    }
  }

  handleReset() {

  }
  handleExpire() {

  }
  handleSuccess(ev) {

  }
  handleLoad() {

  }



  ngOnInit() {
    if (window.navigator.userAgent.indexOf("Chrome") === -1) {
      this.isie = true;
    } else {
      this.isie = false;
    }

    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.registerForm = this.formBuilder.group({
      registerType: [],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      mobileNumber: ['', Validators.required],
      country: [null],
      countryCode: [null],
      mCode: [null],
      type: [null],
      briefDescription: ['', [Validators.required, Validators.minLength(6)]],
      recaptcha: ['', [Validators.required]]
    });

    this.registerForm.controls['registerType'].setValue("customer");
    // this.registerForm.controls['termsChecked'].setValue("true");
    this.registerForm.controls['country'].setValue("India");
    this.registerForm.controls['countryCode'].setValue("in");
    this.registerForm.controls['mCode'].setValue("+91");

  }
  //  firstname(){
  //    if(!this.registerForm.get('firstName').valid){
  //     this.registerForm.get('firstName').setValidators(Validators.required);
  //  }
  //  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  telInputObject(obj) {
    //console.log(obj);
    obj.intlTelInput('setCountry', 'in');
  }
  onCountryChange(obj) {
    // alert(JSON.stringify(obj))
    if (obj != null) {
      var name = obj.name;
      var v = name.split('(')
      //alert(v[0]+"--"+obj.iso2)
      this.registerForm.controls['country'].setValue(v[0]);
      this.registerForm.controls['countryCode'].setValue(obj.iso2);
      this.registerForm.controls['mCode'].setValue("+" + obj.dialCode);
    } else {
      this.registerForm.controls['country'].setValue("India");
      this.registerForm.controls['countryCode'].setValue("in");
      this.registerForm.controls['mCode'].setValue("+91");
    }

  }
  getNumber(obj) {
    // alert(obj)
    this.registerForm.controls['mobileNumber'].setValue(obj);

  }
  hasError(obj) {
    this.mobileNumbererror = obj;
    //alert(this.mobileNumbererror)
  }
  onSubmit(formData) {
    debugger;
    //alert(this.mobileNumbererror)
    this.submitted = true;
    //console.log(JSON.stringify(this.registerForm))
    // stop here if form is invalid
    if (!this.registerForm.invalid ) {
      this.isLoading = true;
     // alert("sss")
      this.EgazeService.existingUserFun(formData.value.email).subscribe(
        result => {
          if (result==='SUCCESS') {
            this.isLoading = false;
            this.existsUser = "This email address already exists.";
          }
          else {
            
            this.EgazeService.corporateUserRequest(formData.value).subscribe(
              result => {
                this.flag=true;
                this.isLoading = false;
                
               // this.registerForm.reset();
               // alert("suuscess");
              }
            );
           // this.isLoading = false;
          }
        }

      );
      }
  }

}
