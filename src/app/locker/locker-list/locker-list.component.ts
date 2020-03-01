import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { UserService } from "../../service/user.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router, NavigationExtras } from "@angular/router";
import { Data } from '../../model/data.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-locker-list',
  templateUrl: './locker-list.component.html',
  styleUrls: ['./locker-list.component.css']
})
export class LockerListComponent implements OnInit {
  public reportTypes: any = [
    {'title': "Select Report", 'id': 0},
    {'title': "Active Lockers", 'id': 7},
    {'title': "Lockers By Date", 'id': 8},
    {'title': "Lockers By Roll No", 'id': 9}];
    
  public selectedReportType: any ;
  public getActiveLockersResponse: any = [];
  public currentDate = new Date();
  public billingDetailsResponse:any = [];
  public enteredRollNo;
  public enteredFromDate;
  public enteredToDate;
  public searchByRollNo: boolean = false;
  public searchByDateRange: boolean = false;

  constructor( private userService: UserService,
    public modalService: BsModalService,
    private router: Router,
    public data: Data, public datepipe: DatePipe) { }

  ngOnInit() {
    this.selectedReportType = 0;
  }

  changeFunc(){
    if(this.selectedReportType == 9){
      this.searchByRollNo = true;
      this.searchByDateRange = false;
    }else if(this.selectedReportType == 8){
      this.searchByRollNo = false;
      this.searchByDateRange = true;
    }
  }

  generateReport(){
    if(this.selectedReportType == 7){
      this.userService.getMemberPayment("reportFlag=1&lockerFlag=1").subscribe((response: any) => {
        this.billingDetailsResponse = response.data;
    });  
    } else if(this.selectedReportType == 8){
      this.userService.getMemberPayment("reportFlag=2&statusFlag=1&fromDate="+this.datepipe.transform(this.enteredFromDate, 'yyyy-MM-dd')+"&toDate="+this.datepipe.transform(this.enteredToDate, 'yyyy-MM-dd')).subscribe((response: any) => {
      this.billingDetailsResponse = response.data;
    });
    } else if(this.selectedReportType == 9){
      this.userService.getMemberPayment("reportFlag=3&lockerFlag=1&rollNo="+this.enteredRollNo).subscribe((response: any) => {
        this.billingDetailsResponse = response.data;
    });
    } 
  }

}
