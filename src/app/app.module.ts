import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';

import { ModalDialogModule } from 'ngx-modal-dialog';
import { MessagemodalpopupComponent } from './messagemodalpopup/messagemodalpopup.component';
import { SuccessregsiterComponent } from './successregsiter/successregsiter.component';
import { PackagesComponent } from './packages/packages.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ViewpropertyComponent } from './viewproperty/viewproperty.component';
import { PwdchangesuccessComponent } from './pwdchangesuccess/pwdchangesuccess.component';
import { PackageconfirmComponent } from './packageconfirm/packageconfirm.component';
import { EgazeService } from './services/egaze.service';
import { SessionstorageService } from './services/sessionstorage.service';
import { LoadingDivComponent } from './loading-div/loading-div.component';
import { AdminModule } from './admin/admin.module';
import { ModalPropertyComponent } from './modal-property/modal-property.component';
import { ModalPropertyService } from './services/modal-property.service';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { HelpComponent } from './help/help.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { ArticlesComponent } from './articles/articles.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ServicesComponent } from './services/services.component';
import { PropertyMonitoringComponent } from './property-monitoring/property-monitoring.component';
import { AbouteGazeComponent } from './aboute-gaze/aboute-gaze.component';
import { WhyeGazeComponent } from './whye-gaze/whye-gaze.component';
import { BlogsComponent } from './blogs/blogs.component';
import { EgazeServicesComponent } from './egaze-services/egaze-services.component';
import { PackageDescriptionComponent } from './package-description/package-description.component';
import { DataTableModule } from "angular-6-datatable";
import { Ng2TelInputModule } from 'ng2-tel-input';
import { ProfileComponent } from './profile/profile.component';
import { AgentregisterComponent } from './agentregister/agentregister.component';
import { NonceQueryParamInterceptorService } from './services/nonce-query-param-interceptor.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Home1Component } from './home1/home1.component';
import { RoleAuthenticationService as RoleGuard } from './services/role-authentication';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';

import { AgentModule } from './agent/agent.module';
import { PaymentComponent } from './payment/payment.component';
import { PaymentResponseComponent } from './payment-response/payment-response.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { CorporateregisterComponent } from './corporateregister/corporateregister.component';
import { CloginComponent } from './clogin/clogin.component';
import { CadmindashboardComponent } from './cadmindashboard/cadmindashboard.component';
import { CuserdashboardComponent } from './cuserdashboard/cuserdashboard.component';
import { CorporateuserComponent } from './admin/corporateuser/corporateuser.component';
import { CorporatepropertyComponent } from './admin/corporateproperty/corporateproperty.component';

const appRoutes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'help', component: HelpComponent },
  { path: 'sitemap', component: SitemapComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'property-monitoring', component: PropertyMonitoringComponent },
  { path: 'abouteGAZE', component: AbouteGazeComponent },
  { path: 'whyeGAZE', component: WhyeGazeComponent },
  { path: 'blog', component: BlogsComponent },

  { path: 'egaze-services', component: EgazeServicesComponent },
  { path: 'package-description', component: PackageDescriptionComponent },


  { path: 'loginform', component: UserloginComponent },
  { path: 'clogin', component: CloginComponent },
  { path: 'registerform', component: UserregisterComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'userdashboard', component: UserdashboardComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'customer'
    }
  },
  {
    path: 'cuserdashboard', component: CuserdashboardComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'corporateuser'
    }
  },
  {
    path: 'cadmindashboard', component: CadmindashboardComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'corporateadmin'
    }
  },
  { path: 'success-register', component: SuccessregsiterComponent },
  {
    path: 'package-choose', component: PackagesComponent
  },
  { path: 'forget-password', component: ForgetpasswordComponent },

  {
    path: 'profile', component: ProfileComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'customer'
    }
  },
  { path: 'agent-registration', component: AgentregisterComponent },
  { path: 'home', component: Home1Component },
  {
    path: 'payment', component: PaymentComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'customer'
    }
  },
  {
    path: 'payment-response', component: PaymentResponseComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'customer'
    }
  },
  { path:'refund-policy', component: RefundPolicyComponent},
  { path:'cregister', component: CorporateregisterComponent},
  { path: 'unauthorized', component: PagenotfoundComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserloginComponent,
    UserregisterComponent,
    PagenotfoundComponent,
    UserdashboardComponent,
    MessagemodalpopupComponent,
    SuccessregsiterComponent,
    PackagesComponent,
    ForgetpasswordComponent,
    ViewpropertyComponent,
    PwdchangesuccessComponent,
    PackageconfirmComponent,
    LoadingDivComponent,
    ModalPropertyComponent,
    AboutusComponent,
    ContactusComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    DisclaimerComponent,
    HelpComponent,
    SitemapComponent,
    ArticlesComponent,
    TestimonialsComponent,
    ServicesComponent,
    PropertyMonitoringComponent,
    AbouteGazeComponent,
    WhyeGazeComponent,
    BlogsComponent,
    EgazeServicesComponent,
    PackageDescriptionComponent,
    ProfileComponent,
    AgentregisterComponent,
    HeaderComponent,
    FooterComponent,
    Home1Component,
    AgentdashboardComponent,
    PaymentComponent,
    PaymentResponseComponent,
    RefundPolicyComponent,
    CorporateregisterComponent,
    CloginComponent,
    CadmindashboardComponent,
    CuserdashboardComponent
  ],
  entryComponents: [
    MessagemodalpopupComponent,
    ForgetpasswordComponent,
    ViewpropertyComponent,
    PackageconfirmComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    ModalDialogModule.forRoot(), AdminModule, AgentModule, DataTableModule, Ng2TelInputModule,
    BrowserAnimationsModule,NgxPayPalModule,NgxCaptchaModule
  ],
  exports: [
    LoadingDivComponent,CorporateuserComponent,CorporatepropertyComponent

  ],
  // ,{ 
  //   provide: HTTP_INTERCEPTORS, 
  //   useClass: NonceQueryParamInterceptorService, multi: true 
  // }
  providers: [EgazeService, SessionstorageService, ModalPropertyService, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
