import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from "../../service/user.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router, NavigationExtras } from "@angular/router";
import { Data } from '../../model/data.model';

@Component({
  selector: 'app-member-report',
  templateUrl: './member-report.component.html',
  styleUrls: ['./member-report.component.css']
})
export class MemberReportComponent implements OnInit {

  public reportTypes: any = [
    { 'title': "Select Report", 'id': 0},
    { 'title': "Current Year Paid List", 'id': 1 },
    { 'title': "Year Wise", 'id': 2 },
    { 'title': "Membership By Roll No", 'id': 3 },
    { 'title': "Active Members", 'id': 4 },
    { 'title': "In-Active Members", 'id': 5 },
    { 'title': "Welfare Fund Members", 'id': 6 },
    { 'title': "Life Time Members", 'id': 7 },
  ];
   
  public selectedReportType: any;
  public billingDetailsResponse:any = [];
  public memberDetailsResponse:any =  [];
  public currentDate = new Date();
  public currentYear ;
  public enteredRollNo ; 
  public enteredYear ;
  public reportByRollNoFlag: boolean = false;
  public reportByYearFlag: boolean = false;
  public year: any = [];
  public nullResponseFlag: boolean = false;

  public showAmountAndCount: boolean = false;
  public totalRecords: any;
  public totalAmount: any;

  constructor(private userService: UserService,
    public modalService: BsModalService,
    private router: Router,
    public data: Data) { }

  ngOnInit() {
    this.enteredYear = this.currentDate.getFullYear();
    this.currentYear = this.currentDate.getFullYear();
    for(var i=0 ; i < 31; i++){
      this.year.push(this.currentYear+i);
    }
    this.selectedReportType = 0;
  }

  showHideInputs(){
    this.memberDetailsResponse = [];
    this.billingDetailsResponse = [];
    this.showAmountAndCount = false;
    this.nullResponseFlag = false;
    if(this.selectedReportType == 2){
      this.reportByYearFlag = true;
      this.reportByRollNoFlag = false;
    }else if(this.selectedReportType == 3){
      this.reportByYearFlag = false;
      this.reportByRollNoFlag = true;
    }else{
      this.reportByYearFlag = false;
      this.reportByRollNoFlag = false;
    }
  }

  generateReport() {
    this.nullResponseFlag = false;
    this.billingDetailsResponse = [];    
    if (this.selectedReportType == 1) {
      this.userService.getMemberPayment("reportFlag=4&membershipFlag=1&year="+this.currentDate.getFullYear()).subscribe((response: any) => {
        if(response.data.length == 0){
          this.showAmountAndCount = false;
          this.nullResponseFlag = true;
        }else{
          let totalAmountCalc = 0;
          for (let i = 0; i < response.data.length; i++) {
            totalAmountCalc = totalAmountCalc+ (+response.data[i].amount);
          }
          this.totalRecords = response.data.length;
          this.totalAmount = totalAmountCalc;
          this.showAmountAndCount = true;
        }
        this.billingDetailsResponse = response.data;
        this.memberDetailsResponse = [];
      });
    } else if (this.selectedReportType == 2) {
      this.userService.getMemberPayment("reportFlag=4&membershipFlag=1&year="+this.enteredYear).subscribe((response: any) => {
        if(response.data.length == 0){
          this.showAmountAndCount = false;
          this.nullResponseFlag = true;
        }else{
          let totalAmountCalc = 0;
          for (let i = 0; i < response.data.length; i++) {
            totalAmountCalc = totalAmountCalc+ (+response.data[i].amount);
          }
          this.totalRecords = response.data.length;
          this.totalAmount = totalAmountCalc;
          this.showAmountAndCount = true;
        }
        this.billingDetailsResponse = response.data;
        this.memberDetailsResponse = [];
      });
    } else if (this.selectedReportType == 3) {
      this.userService.getMemberPayment("reportFlag=5&membershipFlag=1&rollNo="+this.enteredRollNo ).subscribe((response: any) => {
        if(response.data.length == 0){
          this.showAmountAndCount = false;
          this.nullResponseFlag = true;
        }else{
          let totalAmountCalc = 0;
          for (let i = 0; i < response.data.length; i++) {
             totalAmountCalc = totalAmountCalc+ (+response.data[i].amount);
          }
          this.totalRecords = response.data.length;
          this.totalAmount = totalAmountCalc;
          this.showAmountAndCount = true;
        }
        this.billingDetailsResponse = response.data;
        this.memberDetailsResponse = [];
      });
    } else if (this.selectedReportType == 4) {
      this.userService.getMember("resultFlag=0&activeFlag=1").subscribe((response: any) => {
        if(response.data.length == 0)this.nullResponseFlag = true;
        this.memberDetailsResponse = response.data;
        this.billingDetailsResponse = [];
      });
    } else if (this.selectedReportType == 5) {
      this.userService.getMember("resultFlag=0&activeFlag=0").subscribe((response: any) => {
        if(response.data.length == 0)this.nullResponseFlag = true;
        this.memberDetailsResponse = response.data;
        this.billingDetailsResponse = [];
      });
    } else if (this.selectedReportType == 6) {
      this.userService.getMember("resultFlag=1&welfareFundMemberFlag=1").subscribe((response: any) => {
        if(response.data.length == 0)this.nullResponseFlag = true;
        this.memberDetailsResponse = response.data;
        this.billingDetailsResponse = [];
      });
    }else if (this.selectedReportType == 7) {
      this.userService.getMember("resultFlag=2&lifeTimeMemberFlag=1").subscribe((response: any) => {
        if(response.data.length == 0)this.nullResponseFlag = true;
        this.memberDetailsResponse = response.data;
        this.billingDetailsResponse = [];
      });
    }
  }

  printPage(){
    window.print();
  }

  // printBill(item: any){
  //   this.paymentForm.controls.fromDate.patchValue(item.from_date);
  //   this.paymentForm.controls.toDate.patchValue(item.to_date);
  //   this.paymentForm.controls.amount.patchValue(item.amount);
  //   this.generatedBillNo = item.bill_no;
  //   this.amountInWords = this.inWords(item.amount);
  //   setTimeout(() => window.print(), 350);
  // }

}
