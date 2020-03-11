import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
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
    { 'title': "Select Report", 'id': 0 },
    { 'title': "Active Lockers", 'id': 7 },
    { 'title': "Lockers By Date", 'id': 8 },
    { 'title': "Lockers By Roll No", 'id': 9 }];

  public selectedReportType: any;
  public getActiveLockersResponse: any = [];
  public currentDate = new Date();
  public billingDetailsResponse: any = [];
  public enteredRollNo;
  public enteredFromDate;
  public enteredToDate;
  public searchByRollNo: boolean = false;
  public searchByDateRange: boolean = false;
  public nullResponseFlag: boolean = false;
  public showAmountAndCount: boolean = false;
  public totalRecords: number = 0;
  public totalAmount = 0;

  public rollNoNullFlag:boolean = false;
  public dateRangeNullFlag:boolean = false;


  constructor(private userService: UserService,
    public modalService: BsModalService,
    private router: Router,
    public data: Data, public datepipe: DatePipe) { }

  ngOnInit() {
    if(sessionStorage.getItem("isLoggedIn") != "true"){
      this.router.navigate(["login"]);
    }
    this.billingDetailsResponse = [];
    this.selectedReportType = 0;
  }

  changeFunc() {
    this.rollNoNullFlag = false;
    this.dateRangeNullFlag = false;
    if (this.selectedReportType == 9) {
      this.searchByRollNo = true;
      this.searchByDateRange = false;
    } else if (this.selectedReportType == 8) {
      this.searchByRollNo = false;
      this.searchByDateRange = true;
    } else{
      this.searchByRollNo = false;
      this.searchByDateRange = false;
    }
  }

  generateReport() {
    this.billingDetailsResponse = [];
    this.nullResponseFlag = true;
    this.showAmountAndCount = false;
    if(this.checkMandatoryFields()){
      if (this.selectedReportType == 7) {
        this.userService.getMemberPayment("reportFlag=1&lockerFlag=1").subscribe((response: any) => {
          if (response.data.length == 0) {
            this.nullResponseFlag = true;
            this.showAmountAndCount = false;
            this.billingDetailsResponse = response.data;
          } else {
            let totalAmountCalc = 0;
            for (let i = 0; i < response.data.length; i++) {
              totalAmountCalc = totalAmountCalc + (+response.data[i].amount);
            }
            this.totalRecords = response.data.length;
            this.totalAmount = totalAmountCalc;
            this.nullResponseFlag = false;
            this.showAmountAndCount = true;
            this.billingDetailsResponse = response.data;
          }
        });
      } else if (this.selectedReportType == 8) {
        this.userService.getMemberPayment("reportFlag=2&statusFlag=1&fromDate=" + this.datepipe.transform(this.enteredFromDate, 'yyyy-MM-dd') + "&toDate=" + this.datepipe.transform(this.enteredToDate, 'yyyy-MM-dd')).subscribe((response: any) => {
          if (response.data.length == 0) {
            this.nullResponseFlag = true;
            this.showAmountAndCount = false;
            this.billingDetailsResponse = response.data;
          } else {
            let totalAmountCalc = 0;
            for (let i = 0; i < response.data.length; i++) {
              totalAmountCalc = totalAmountCalc + (+response.data[i].amount);
            }
            this.totalRecords = response.data.length;
            this.totalAmount = totalAmountCalc;
            this.nullResponseFlag = false;
            this.showAmountAndCount = true;
            this.billingDetailsResponse = response.data;
          }
        });
      } else if (this.selectedReportType == 9) {
        this.userService.getMemberPayment("reportFlag=3&lockerFlag=1&rollNo=" + this.enteredRollNo).subscribe((response: any) => {
          if (response.data.length == 0) {
            this.nullResponseFlag = true;
            this.showAmountAndCount = false;
            this.billingDetailsResponse = response.data;
          } else {
            let totalAmountCalc = 0;
            for (let i = 0; i < response.data.length; i++) {
              totalAmountCalc = totalAmountCalc + (+response.data[i].amount);
            }
            this.totalRecords = response.data.length;
            this.totalAmount = totalAmountCalc;
            this.nullResponseFlag = false;
            this.showAmountAndCount = true;
            this.billingDetailsResponse = response.data;
          }
        });
      }
    }
  }

  checkMandatoryFields(){
    let successFlag = true;
    this.rollNoNullFlag = false;
    this.dateRangeNullFlag = false;

    if ((this.enteredRollNo == undefined || this.enteredRollNo == "") && this.selectedReportType == 9) {
      this.rollNoNullFlag = true;
      successFlag = false;
    }

    if (((this.enteredFromDate == undefined || this.enteredFromDate == "") || (this.enteredToDate == undefined || this.enteredToDate == "")) && this.selectedReportType == 8) {
      this.dateRangeNullFlag = true;
      successFlag = false;
    }

    return successFlag;
  }




}
