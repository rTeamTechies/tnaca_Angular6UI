import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { UserService } from "../../service/user.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router, NavigationExtras } from "@angular/router";
import { Data } from '../../model/data.model';

@Component({
  selector: 'app-judge-cost-list',
  templateUrl: './judge-cost-list.component.html',
  styleUrls: ['./judge-cost-list.component.css']
})
export class JudgeCostListComponent implements OnInit {

  public loading = false;
  public judgeCostBillingListRes : any = [];
  public generatedBillNo: string ="";
  public amountInWords: string = "";
  public printData = {
    'judgeName': "",
    'caseNo' : "",
    'amount' : "",
    'paymentType': "",
    'billNo': ""
  };

  public a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  public b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
  public n : any;

  constructor(
    private userService: UserService,
    public modalService: BsModalService,
    private router: Router,
    public data: Data
    ) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getJudgeCost()
    .subscribe((response : any) => {
      this.judgeCostBillingListRes = response.data;
      this.loading = false;
    });

  }

  printBill(item: any){
    this.generatedBillNo = item.bill_no;
    this.amountInWords = this.inWords(item.amount);
    this.printData.judgeName = item.judge_name;
    this.printData.caseNo = item.case_no;
    this.printData.amount = item.amount;
    this.printData.paymentType = item.payment_type;
    this.printData.billNo = item.bill_no;
    setTimeout(() => window.print(), 350);
  }


  inWords (num) {
  if ((num = num.toString()).length > 9) return 'overflow';
  this.n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!this.n) return; var str = '';
  str += (this.n[1] != 0) ? (this.a[Number(this.n[1])] || this.b[this.n[1][0]] + ' ' + this.a[this.n[1][1]]) + 'crore ' : '';
  str += (this.n[2] != 0) ? (this.a[Number(this.n[2])] || this.b[this.n[2][0]] + ' ' + this.a[this.n[2][1]]) + 'lakh ' : '';
  str += (this.n[3] != 0) ? (this.a[Number(this.n[3])] || this.b[this.n[3][0]] + ' ' + this.a[this.n[3][1]]) + 'thousand ' : '';
  str += (this.n[4] != 0) ? (this.a[Number(this.n[4])] || this.b[this.n[4][0]] + ' ' + this.a[this.n[4][1]]) + 'hundred ' : '';
  str += (this.n[5] != 0) ? ((str != '') ? 'and ' : '') + (this.a[Number(this.n[5])] || this.b[this.n[5][0]] + ' ' + this.a[this.n[5][1]]) + 'only ' : '';
  return str;
}

}
