import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../service/user.service";
import { ToastrService } from 'ngx-toastr';
import { Data } from '../../model/data.model';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-judge-cost-add-edit',
  templateUrl: './judge-cost-add-edit.component.html',
  styleUrls: ['./judge-cost-add-edit.component.css']
})
export class JudgeCostAddEditComponent implements OnInit {

  public addJudgeCostForm: FormGroup;
  public paymentTypes: any = ['CASH', 'CHEQUE', 'DD'];
  public generatedBillNo: string ="";
  public amountInWords: string = "";
    
  public a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  public b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
  public n : any;

  public judgeNameNullFlag: boolean = false;
  public caseNoNullFlag: boolean = false;
  public amountNullFlag: boolean = false;
  public todayDate = this.datepipe.transform(new Date(), 'dd-MM-yyyy');

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    public activeRoute: ActivatedRoute,
    private data: Data, public datepipe: DatePipe) { }


  ngOnInit() {
    this.addJudgeCostForm = this.formBuilder.group({
      billDate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd')],
      judgeName: ['', Validators.required],
      caseNo: ['', Validators.required],
      amount: ['', Validators.required],
      paymentType: ['CASH']
    });
  }

  onSubmit() {
    if(this.mandatoryValidationsPass()){
      this.userService.addJudgeCost(this.addJudgeCostForm.value)
      .subscribe((data: any) => {
        if (data.status == "Success") {

          this.generatedBillNo = data.billNo;
          this.amountInWords = this.inWords(this.addJudgeCostForm.value.amount);
          setTimeout(() => this.printAndClearForm(data), 350);
        } else if (data.status == "Failure") {
          this.toastr.error(data.message)
        } else {
          this.toastr.error("Error", "Something went wrong. Try again later..!")
        }
      });
    }
  }

  clearForm() {
    this.addJudgeCostForm.reset();
    this.addJudgeCostForm.controls.billDate.patchValue(this.datepipe.transform(new Date(), 'yyyy-MM-dd'));
    this.addJudgeCostForm.controls.paymentType.patchValue('CASH');
    this.clearErrors();
  }

  clearErrors(){
    this.judgeNameNullFlag = false;
    this.caseNoNullFlag = false;
    this.amountNullFlag = false;
  }

  printAndClearForm(data) {
    window.print();
    this.toastr.success(data.message);
    this.clearForm();
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

mandatoryValidationsPass(){
  this.clearErrors();
  let success = true;
  if(this.addJudgeCostForm.value.judgeName == null || this.addJudgeCostForm.value.judgeName.trim() == ""){
    this.judgeNameNullFlag = true;
    success = false;  
  }else if(this.addJudgeCostForm.value.caseNo == null || this.addJudgeCostForm.value.caseNo.trim() == ""){
    this.caseNoNullFlag = true;
    success = false;
  }else  if(this.addJudgeCostForm.value.amount == null || this.addJudgeCostForm.value.amount.trim() == ""){
    this.amountNullFlag = true;
    success = false;
  }
  return success;
}

}
