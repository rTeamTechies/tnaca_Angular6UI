import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../service/user.service";
import { ToastrService } from 'ngx-toastr';
import { Data } from '../../model/data.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';

@Component({ 

  selector: 'app-member-payment',
  templateUrl: './member-payment.component.html',
  styleUrls: ['./member-payment.component.css']
})
export class MemberPaymentComponent implements OnInit {

  public paymentForm: FormGroup;
  public fromListingPage: boolean = false;
  public paymentHistoryres : any = [];
  public paymentTypes: any = ['CASH', 'CHEQUE', 'DD'];
  public subscriptionYear: any = [];
  public subscriptionType: any = ['YEARLY'];
  public currenDate = new Date();
  public currentYear;
  public memberDataResponse: any;
  public memberName: string;
  public loading: boolean = false;
  public generatedBillNo: string;
  public amountInWords: string;
  public check : boolean =false;
  public modalRef: BsModalRef;
  public disableSubmitFlag: boolean = true;
  public todayDate = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
  
  public a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  public b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
  public n : any;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    public activeRoute: ActivatedRoute,
    private data: Data,
    public modalService: BsModalService, public datepipe: DatePipe) { 
      if(this.data.memberDataTransfer && this.data.memberDataTransfer.member_id != undefined && this.data.memberDataTransfer.member_id != ""){
        this.fromListingPage = true;
      }
    }

    public rollNullFlag: boolean = false;
    public memberNameNullFlag: boolean = false;
    public amountNullFlag: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.currentYear = this.currenDate.getFullYear();
    for(var i=0 ; i < 31; i++){
      this.subscriptionYear.push(2000+i);
    }

    if(this.fromListingPage){
      this.disableSubmitFlag = false;
      this.memberName = this.data.memberDataTransfer.name;
      this.userService.getMemberPayment("reportFlag=5&membershipFlag=1&rollNo="+this.data.memberDataTransfer.roll_no)
        .subscribe((response : any) => {
          this.paymentHistoryres = response.data;
        });
      this.paymentForm = this.formBuilder.group({      
        rollNo: [this.data.memberDataTransfer.roll_no, Validators.required],
        name: [this.data.memberDataTransfer.name, Validators.required],
        subscriptionType: ['YEARLY',Validators.required],
        subscriptionYear : [this.currenDate.getFullYear(),Validators.required],
        amount: ['', Validators.required],
        paymentType: ['CASH'],  
        membershipFlag : [1],
        fromDate: [''],
        toDate: ['']
      });
      this.loading = false;
    }else{     
      this.paymentForm = this.formBuilder.group({      
        rollNo: ['', Validators.required],
        name: ['', Validators.required],
        subscriptionType: ['YEARLY',Validators.required],
        subscriptionYear : [this.currenDate.getFullYear(),Validators.required],
        amount: ['',Validators.required],
        paymentType: ['CASH'],
        membershipFlag : [1],
        fromDate: [''],
        toDate: ['']
      });
      this.loading = false;

    }
  }

  getRollNoDetails() {
    this.userService.getMemberByRollNo(this.paymentForm.value.rollNo)
      .subscribe((response: any) => {
        if (response.data.length > 0) {
          this.disableSubmitFlag = false;
          this.memberName = response.data[0].name;
          this.userService.getMemberPayment("reportFlag=5&membershipFlag=1&rollNo=" + response.data[0].roll_no)
            .subscribe((response: any) => {
              this.paymentHistoryres = response.data;
            });
        }else{
          this.toastr.error("Error", "Entered Roll No not Exists.")
          this.disableSubmitFlag = true;
          this.paymentHistoryres = [];
          this.memberName = "";
        }
      });
  }

  confirmPayment(template: TemplateRef<any>){
    if(this.checkMandatoryFields()){
      this.modalRef = this.modalService.show(template, {
        animated: true,
        backdrop: 'static'
      }); 
    }
  }

  checkMandatoryFields(){
    let successFlag = true;
    this.rollNullFlag = false;
    this.memberNameNullFlag = false;
    this.amountNullFlag = false;
    if (this.paymentForm.value.rollNo.toString().trim() == "") {
      this.rollNullFlag = true;
      successFlag = false;
      this.loading = false;
    }

    if (this.paymentForm.value.name.trim() == "") {
      this.memberNameNullFlag = true;
      successFlag = false;
      this.loading = false;
    }

    if (this.paymentForm.value.amount == 0) {
      this.amountNullFlag = true;
      successFlag = false;
      this.loading = false;
    }

    return successFlag;
  }

  callPayment(){
    this.paymentForm.controls.fromDate.patchValue(this.paymentForm.controls.subscriptionYear.value + "-01-01");
    this.paymentForm.controls.toDate.patchValue(this.paymentForm.controls.subscriptionYear.value + "-12-31");
    this.userService.memberPayment(this.paymentForm.value)
        .subscribe((data : any) => {
          if(data.status == "Success"){
            this.generatedBillNo = data.billNo;
            this.amountInWords = this.inWords(this.paymentForm.value.amount);            
            setTimeout(() => this.printAndClearForm(data), 350);
          }else if(data.status == "Failure"){
            this.toastr.error(data.message)
          }else{
            this.toastr.error("Error", "Something went wrong. Try again later..!")
          }
        });
  }

  clearForm(){
    this.paymentForm.reset();
    this.paymentForm.controls.membershipFlag.patchValue(1);
    this.paymentForm.controls.fromDate.patchValue(this.subscriptionYear + "-01-01");
    this.paymentForm.controls.toDate.patchValue(this.subscriptionYear + "-12-31");
    this.paymentForm.controls.subscriptionType.patchValue("YEARLY");
    this.paymentForm.controls.subscriptionYear.patchValue(this.currenDate.getFullYear());
    this.paymentForm.controls.paymentType.patchValue("CASH");
    this.paymentHistoryres = [];
    this.disableSubmitFlag = true;
    
  }

printAndClearForm(data){
  this.toastr.success(data.message);
  window.print();
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
    return str = str[0].toUpperCase() + str.slice(1);;
}

printBill(item: any){
  this.paymentForm.controls.fromDate.patchValue(item.from_date);
  this.paymentForm.controls.toDate.patchValue(item.to_date);
  this.paymentForm.controls.amount.patchValue(item.amount);
  this.generatedBillNo = item.bill_no;
  this.amountInWords = this.inWords(item.amount);
  setTimeout(() => window.print(), 350);
}


}
