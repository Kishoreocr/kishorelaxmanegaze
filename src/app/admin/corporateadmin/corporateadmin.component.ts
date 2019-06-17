import { Component, OnInit, ViewContainerRef ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService } from 'ngx-modal-dialog';
import { EgazeService } from '../../services/egaze.service';
import { LoadingDivComponent } from '../../loading-div/loading-div.component';
import { interval } from 'rxjs/observable/interval';
import {ReCaptcha2Component} from 'ngx-captcha'

@Component({
  selector: 'app-corporateadmin',
  templateUrl: './corporateadmin.component.html',
  styleUrls: ['./corporateadmin.component.css']
})
export class CorporateadminComponent implements OnInit {

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

  showText: boolean;
  showIconEye: boolean = false;
  hideIconEye: boolean = false;

  showText1: boolean;
  showIconEye1: boolean = false;
  hideIconEye1: boolean = false;

  isie: any = false;
  otpForm: FormGroup;
  otpValue: any;
  errorMessage: any;
  errorValidation: string;
  timerOn = true;
  resend:any=false;
  siteKey = "6Lesto4UAAAAAKLdXIngWkCCJ3vouN4ZqngQERtp";
  size: any = "normal";
  lang: any = "en";
  theme: any = "light";//Light
  type: any = "image";
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, modalService: ModalDialogService, viewRef: ViewContainerRef, private EgazeService: EgazeService) {

    this.modalService = modalService;
    this.viewRef = viewRef;

    this.showText = false;
    this.showIconEye = false;
    this.hideIconEye = true;

    this.showText1 = false;
    this.showIconEye1 = false;
    this.hideIconEye1 = true;

  }
  isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.charCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }

  isCharts(event) {
    if ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8 ){
    return true;
  }else {
      return false;
    }
  }

// allow the space in register form for name field.

isChartsName(event) {
  if ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8 || event.charCode == 32 ){
  return true;
}else {
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


  pswdstrong(control: AbstractControl): any {
    // alert(control.value)
     let hasNumber = /\d/.test(control.value);
     let hasUpper = /[A-Z]/.test(control.value);
     let hasLower = /[a-z]/.test(control.value);
      //console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
     const valid = hasNumber && hasUpper && hasLower;
     if (!valid) {
         // return what´s not valid
         return { pwdstrong: true };
     }
     return ;
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
      companyName:['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      mobileNumber: ['', Validators.required],
      //zipCode: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      password: ['', [Validators.required, Validators.minLength(4),this.pswdstrong]],
     // confirmPassword: ['', [Validators.required, Validators.minLength(4), this.passwordConfirming,this.pswdstrong,]],
      termsChecked: [false, Validators.required],
      country: [null],
      countryCode: [null],
      mCode: [null],
      type: [null],
      recaptcha: ['', [Validators.required]]
    });

    this.registerForm.controls['registerType'].setValue("customer");
   // this.registerForm.controls['termsChecked'].setValue("true");
    this.registerForm.controls['country'].setValue("India");
    this.registerForm.controls['countryCode'].setValue("in");
    this.registerForm.controls['mCode'].setValue("+91");
    this.route.queryParamMap.subscribe(params => {
      if (params.get('type') === 'free') {
        this.registerForm.controls['type'].setValue("Free");
      } else {
        this.registerForm.controls['type'].setValue("Normal");
      }
    });
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
  }
  //  firstname(){
  //    if(!this.registerForm.get('firstName').valid){
  //     this.registerForm.get('firstName').setValidators(Validators.required);
  //  }
  //  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  get f1() { return this.otpForm.controls; }
  passwordConfirming(c: AbstractControl): any {
    if (!c.parent || !c) return;
    const pwd = c.parent.get('password');
    const cpwd = c.parent.get('confirmPassword')

    if (!pwd || !cpwd) return;
    if (pwd.value !== cpwd.value) {
      return { notSame: true };

    }

  }
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
      this.registerForm.controls['mCode'].setValue("+"+obj.dialCode);
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

    if (this.registerForm.invalid ) {
      if (!formData.value.termsChecked)
      this.termsCheckederrors = "Please accept Terms and Conditions";
    else
      this.termsCheckederrors = "";
      return;
    } else if (!formData.value.termsChecked) {
      if (!formData.value.termsChecked)
        this.termsCheckederrors = "Please accept Terms and Conditions";
      else
        this.termsCheckederrors = "";
    }else if (!this.mobileNumbererror){
      return;

    }

    else {
      this.termsCheckederrors = "";
      this.isLoading = true;
      this.EgazeService.existingUserFun(formData.value.email).subscribe(
        result => {
          if (result==='SUCCESS') {
            this.isLoading = false;
            this.existsUser = "This email address already exists.";
          }
          else {
            this.isLoading = false;
            // sessionStorage.setItem("formData", JSON.stringify(this.registerForm.value));
            alert("created")
            //alert(formData.value.email+"=="+formData.value.mobileNumber)


            //this.openNewDialog(formData);
          }
        }

      );





      //this.router.navigateByUrl('/userdashboard');
    }
  }
  terms() {
    if (this.registerForm.get('termsChecked').value)
      this.termsCheckederrors = "Please accept Terms and Conditions";
    else
      this.termsCheckederrors = "";
  }

  // openNewDialog(formData) {
  //   this.modalService.openDialog(this.viewRef, {
  //     title: 'Validate OTP(One Time Passcode)',
  //     childComponent: MessagemodalpopupComponent
  //   });
  // }

  
  /** register modal code close here*/


  showTextPwd(registerForm) {
    if (registerForm.value.password) {
      this.showText = !this.showText;
      this.showIconEye = !this.showIconEye;
      this.hideIconEye = !this.hideIconEye;
    }
  }

  showTextPwd1(registerForm) {
    if (registerForm.value.confirmPassword) {
      this.showText1 = !this.showText1;
      this.showIconEye1 = !this.showIconEye1;
      this.hideIconEye1 = !this.hideIconEye1;
    }
  }

  mouseoverpwd() {
    this.showText = false;
    this.showIconEye = false;
    this.hideIconEye = true;
  }
  mouseoverpwd1() {
    this.showText1 = false;
    this.showIconEye1 = false;
    this.hideIconEye1 = true;
  }


  OTPSave() {
    this.submitted1 = true;
    this.isLoading = true;
    this.errorMessage='';
    if (parseInt(this.otpForm.value.otp) === parseInt(this.otpValue)) {
     // debugger;
      //this.otpForm.value.otp = "";
      this.EgazeService.registerFun(this.registerForm.value).subscribe(result => {
        this.isLoading = false;
        var out=JSON.parse(JSON.stringify(result));
        if (out.message==='SUCCESS') {
          // sessionStorage.removeItem("formData");
          // sessionStorage.setItem("regsuc","success");
          //this.closeModal('registermodal');
          this.router.navigateByUrl('/loginform?data=success');

        }else if (out.message==='MEMBEREXISTS') {
          this.isLoading = false;
          this.existsUser = "This email address already exists.";
        }
      },
        error => {
          this.isLoading = false;
          console.log(error);
        }
      );
    }
    else if (this.otpForm.value.otp) {
      this.isLoading = false;
      this.errorMessage = "Invalid OTP."
    }
    else {
      this.isLoading = false;
      this.errorValidation = "OTP is required"
    }
  }

}

