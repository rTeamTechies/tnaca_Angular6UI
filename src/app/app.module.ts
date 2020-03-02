import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from "./app.routing";
import { AuthenticationService } from "./service/auth.service";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MemberListComponent } from "./member/member-list/member-list.component";
import { MemberAddEditComponent } from "./member/member-add-edit/member-add-edit.component";
import { UserService } from "./service/user.service";
import { FormsModule } from '@angular/forms';
import { DataTableModule } from "angular-6-datatable";
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxLoadingModule } from 'ngx-loading';
import { ModalModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Data } from './model/data.model';
import { MemberPaymentComponent } from './member/member-payment/member-payment.component';
import { HeaderComponent } from './header/header.component';
import { LockerAddEditComponent } from './locker/locker-add-edit/locker-add-edit.component';
import { LockerListComponent } from './locker/locker-list/locker-list.component';
import { JudgeCostAddEditComponent } from './judgecost/judge-cost-add-edit/judge-cost-add-edit.component';
import { JudgeCostListComponent } from './judgecost/judge-cost-list/judge-cost-list.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { AdvocateDonationAddComponent } from './advocatedonation/advocate-donation-add/advocate-donation-add.component';
import { AdvocateDonationListComponent } from './advocatedonation/advocate-donation-list/advocate-donation-list.component';
import { MemberReportComponent } from './member/member-report/member-report.component';
import { LockerSurrenderComponent } from './locker/locker-surrender/locker-surrender.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MemberListComponent,
    MemberAddEditComponent,
    MemberPaymentComponent,
    HeaderComponent,
    LockerAddEditComponent,
    LockerListComponent,
    JudgeCostAddEditComponent,
    JudgeCostListComponent,
    AdvocateDonationAddComponent,
    AdvocateDonationListComponent,
    MemberReportComponent,
    LockerSurrenderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    DataTableModule,
    TooltipModule,
    NgxLoadingModule.forRoot({}),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot()   
  ],
  providers: [AuthenticationService, UserService, Data, DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
