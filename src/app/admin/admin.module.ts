import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ModalComponent } from './directives/modal/modal.component';

import { ModalService } from './service/modal.service';
import { PropertyApprovalComponent } from './property-approval/property-approval.component';
import { AgentApprovalComponent } from './agent-approval/agent-approval.component';
import { PaymentApprovalComponent } from './payment-approval/payment-approval.component';
import { CustomPackagesComponent } from './custom-packages/custom-packages.component';
import { PropertyCommentsComponent } from './property-comments/property-comments.component';
import { PortalFeedbackComponent } from './portal-feedback/portal-feedback.component';
import { LoadingDivComponent1Component } from './loading-div-component1/loading-div-component1.component';
import {DataTableModule} from "angular-6-datatable";
import { AdminContactusComponent } from './admin-contactus/admin-contactus.component';
import {RoleAuthenticationService as RoleGuard } from '../services/role-authentication';
import { PropertyAssignmentComponent } from './property-assignment/property-assignment.component';

const appRoutes: Routes = [
  { path: 'adminlogin', component: LoginComponent },
  { path: 'admindashboard', component: AdmindashboardComponent  , canActivate: [RoleGuard], 
  data: { 
      expectedRole: 'admin'
    } }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),DataTableModule

  ],
  declarations: [LoginComponent, AdmindashboardComponent, ModalComponent, PropertyApprovalComponent, AgentApprovalComponent, PaymentApprovalComponent, CustomPackagesComponent, PropertyCommentsComponent, PortalFeedbackComponent, LoadingDivComponent1Component, AdminContactusComponent, PropertyAssignmentComponent],
  providers: [ModalService,RoleGuard]

})
export class AdminModule { }
