import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ModalDialogService } from 'ngx-modal-dialog';
import { MessagemodalpopupComponent } from '../../messagemodalpopup/messagemodalpopup.component';
import { ForgetpasswordComponent } from '../../forgetpassword/forgetpassword.component';
import { EgazeService } from '../../services/egaze.service';
import { SessionstorageService } from '../../services/sessionstorage.service';
import { AppConstants } from '../../services/constants';
import { LoadingDivComponent } from '../../loading-div/loading-div.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  //userloginForm:any;
  userloginForm: FormGroup;
  submitted = false;
  routerProperty: any;
  activeColor: boolean = false;
  loginAttemptcount: number = 5;
  disabledField: boolean = false;
  attemptloginMessage: string;
  modalService: any;
  viewRef: any;
  invalidCredential: string;
  user: any;
  isLoading: boolean;
  msg: any;
  user1: any;

  constructor(private fb: FormBuilder, router: Router, route: ActivatedRoute, modalService: ModalDialogService, viewRef: ViewContainerRef, private EgazeService: EgazeService, private sessionstorageService: SessionstorageService, private http: HttpClient) {
    this.disabledField = false;
    this.routerProperty = router;
    this.modalService = modalService;
    this.viewRef = viewRef;
    this.sessionstorageService.removeUserDetails("user");
    // if (this.routerProperty.url === '/loginform')
    //       {
    //         this.activeColor = true;
    //       }
  }

  ngOnInit() {
    this.disabledField = false;
    this.userloginForm = this.fb.group({
      username: ['', Validators.required],
      userpwd: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.userloginForm.controls; }

  saveUser(userloginForm) {
    if (this.userloginForm.valid) {
      this.isLoading = true;

      this.EgazeService.loginFun(userloginForm).subscribe(message => {
        //alert(message);
        this.isLoading = false;
        if (message === null) {
          this.invalidCredential = "Invalid Credentials";
          if (this.loginAttemptcount == 0 && this.userloginForm.value.username && this.userloginForm.value.userpwd) {
            this.attemptloginMessage = 'Your account has been locked, Please wait for some time..';
          }
          else if (this.userloginForm.value.username && this.userloginForm.value.userpwd) {
            this.loginAttemptcount = this.loginAttemptcount - 1;
            this.attemptloginMessage = 'Login Failed Now Only ' + this.loginAttemptcount + ' Login Attempts Available, Please enter valid Username and Password.';
            if (this.loginAttemptcount == 0) {
              this.disabledField = true;
            }
          }
        }
        else {
          this.user = JSON.stringify(message);

          this.sessionstorageService.setUserDetails(this.user);
          // alert(this.sessionstorageService.getUserDetails());
          this.isLoading = true;
          this.user1 = JSON.parse(this.sessionstorageService.getUserDetails() + "");
          // alert(this.user1.loginId)
          window.location.href = AppConstants.AdminloginURL;
          // this.routerProperty.navigateByUrl('/package-choose');

          this.userloginForm.value.username = "";
          this.userloginForm.value.userpwd = "";
        }

      }, error => {
        this.isLoading = false;
        this.invalidCredential = 'Server error has occurred, Please try later.'


      });

      // if (this.userloginForm.value.username === 'demo@gmail.com' && this.userloginForm.value.userpwd === 'demo123') {

      //   this.routerProperty.navigateByUrl('/package-choose');

      //   this.userloginForm.value.username = "";
      //   this.userloginForm.value.userpwd = "";
      // }

      // return false;
    } else {
      this.submitted = true;


    }
  }

  forgetPWD(event) {
    event.preventDefault();
    this.openNewDialog();
  }
  openNewDialog() {
    this.modalService.openDialog(this.viewRef, {
      title: 'Forgot your Password?',
      childComponent: ForgetpasswordComponent
    });
  }










}
