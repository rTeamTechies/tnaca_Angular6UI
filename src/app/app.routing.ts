import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";

import { MemberListComponent } from "./member/member-list/member-list.component";
import { MemberAddEditComponent } from "./member/member-add-edit/member-add-edit.component";
import { MemberPaymentComponent } from "./member/member-payment/member-payment.component";
import { MemberReportComponent } from "./member/member-report/member-report.component";

import { LockerListComponent } from "./locker/locker-list/locker-list.component";
import { LockerAddEditComponent } from "./locker/locker-add-edit/locker-add-edit.component";
import { LockerSurrenderComponent } from "./locker/locker-surrender/locker-surrender.component";

import { JudgeCostAddEditComponent } from "./judgecost/judge-cost-add-edit/judge-cost-add-edit.component";
import { JudgeCostListComponent } from "./judgecost/judge-cost-list/judge-cost-list.component";

import { AdvocateDonationAddComponent } from "./advocatedonation/advocate-donation-add/advocate-donation-add.component";
import { AdvocateDonationListComponent } from "./advocatedonation/advocate-donation-list/advocate-donation-list.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'member-list', component: MemberListComponent },
  { path: 'member-add-edit', component: MemberAddEditComponent },
  { path: 'member-payment', component: MemberPaymentComponent },
  { path: 'member-report', component: MemberReportComponent },
  { path: 'locker-list', component: LockerListComponent },
  { path: 'locker-add-edit', component: LockerAddEditComponent },
  { path: 'locker-surrender', component: LockerSurrenderComponent },
  { path: 'judge-cost-add-edit', component: JudgeCostAddEditComponent },
  { path: 'judge-cost-list', component: JudgeCostListComponent },
  { path: 'advocate-donation-add', component: AdvocateDonationAddComponent },
  { path: 'advocate-donation-list', component: AdvocateDonationListComponent },
  { path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
