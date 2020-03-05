import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../service/user.service";
import { ToastrService } from 'ngx-toastr';
import { Data } from '../../model/data.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-locker-add-edit',
  templateUrl: './locker-add-edit.component.html',
  styleUrls: ['./locker-add-edit.component.css']
})
export class LockerAddEditComponent implements OnInit {

  public fromListingPage: boolean = false;
  public addMemberLocker : FormGroup;
  myDateValue: Date;
  public paymentTypes: any = ['CASH', 'CHEQUE', 'DD'];
  public memberLockertHistoryres : any = [];
  datepickerModel: Date;
  public memberName: string;
  public generatedBillNo: string;
  public amountInWords: string;
  public rollNoNullFlag: boolean = false;
  public fromDateNullFlag: boolean = false;
  public toDateNullFlag: boolean = false;
  public lockerIdNullFlag: boolean = false;
  public lockerUnavailableFlag: boolean = false;
  public amountNullFlag: boolean = false;
  public disableSubmitNoMember:boolean = true;
  public todayDate = this.datepipe.transform(new Date(), 'dd-MM-yyyy');


  public a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  public b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
  public n : any;
  public memberRollNo: any;


  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    public activeRoute: ActivatedRoute,
    private data: Data,
    public datepipe: DatePipe) { 
      if(this.data.memberDataTransfer && this.data.memberDataTransfer.member_id != undefined && this.data.memberDataTransfer.member_id != ""){
        this.fromListingPage = true;
      }
    }

  ngOnInit() {
    if(this.fromListingPage){
      this.disableSubmitNoMember = false;
      this.addMemberLocker = this.formBuilder.group({      
        billNo: ['', Validators.required],
        rollNo: [this.data.memberDataTransfer.roll_no, Validators.required],
        name: [this.data.memberDataTransfer.name, Validators.required],
        lockerId:['', Validators.required],
        fromDate: ['',Validators.required],
        toDate: ['',Validators.required],
        amount : ['',Validators.required],
        paymentType: ['Cash'],
        lockerFlag : [1]
      });

      this.userService.getMemberPayment("reportFlag=3&lockerFlag=0&rollNo="+this.data.memberDataTransfer.roll_no)
        .subscribe((response : any) => {
          this.memberLockertHistoryres = response.data;
        });

    }else{      
      this.addMemberLocker = this.formBuilder.group({      
        billNo: ['', Validators.required],
        rollNo: ['', Validators.required],
        name: ['', Validators.required],
        lockerId:['', Validators.required],
        fromDate: ['',Validators.required],
        toDate: ['',Validators.required],
        amount : ['',Validators.required],
        paymentType: ['Cash'],
        lockerFlag : [1]
      });
    }
  }
  onSubmit(){
    if(this.formValidation()){
      this.addMemberLocker.value.fromDate = this.datepipe.transform(this.addMemberLocker.value.fromDate, 'yyyy-MM-dd');
      this.addMemberLocker.value.toDate = this.datepipe.transform(this.addMemberLocker.value.toDate, 'yyyy-MM-dd');
      this.userService.memberPayment(this.addMemberLocker.value)
      .subscribe((data : any) => {
        if(data.status == "Success"){
          this.generatedBillNo = data.billNo;
          this.amountInWords = this.inWords(this.addMemberLocker.value.amount);            
          setTimeout(() => this.printAndClearForm(data), 350);
  
        }else if(data.status == "Failure"){
          this.toastr.error(data.message)
        }else{
          this.toastr.error("Error", "Something went wrong. Try again later..!")
        }
      });
    }else{
      return false;
    }
  }

  getRollNoDetails() {
    this.memberRollNo = this.addMemberLocker.value.rollNo;
    this.removeErrorFlagOnChange();
    this.userService.getMemberByRollNo(this.addMemberLocker.value.rollNo)
      .subscribe((response: any) => {
        if (response.data.length > 0) {
          this.disableSubmitNoMember = false;
          this.memberName = response.data[0].name;
          this.userService.getMemberPayment("reportFlag=3&lockerFlag=1&rollNo=" + response.data[0].roll_no)
            .subscribe((response: any) => {
              this.memberLockertHistoryres = response.data;
            });
        }else{
          this.disableSubmitNoMember = true;
          this.memberLockertHistoryres = [];
          this.memberName = "";
          this.toastr.error("Error", "Entered Roll No not Exists.")
        }
      });
  }

  clearForm(){
    this.addMemberLocker.reset();
    this.addMemberLocker.controls.lockerFlag.patchValue(1);
    this.memberLockertHistoryres = [];
  }


printAndClearForm(data : any){
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
    return str;
}


printBill(item: any){
  this.addMemberLocker.controls.fromDate.patchValue(item.from_date);
  this.addMemberLocker.controls.toDate.patchValue(item.to_date);
  this.addMemberLocker.controls.amount.patchValue(item.amount);
  this.addMemberLocker.controls.lockerId.patchValue(item.locker_id);
  this.generatedBillNo = item.bill_no;
  this.amountInWords = this.inWords(item.amount);
  setTimeout(() => window.print(), 350);
}


checkLockerAvailability(){
  if(this.addMemberLocker.value.lockerId.trim() != "" && this.addMemberLocker.value.fromDate != "" && this.addMemberLocker.value.toDate != ""){
    let fromDate = this.datepipe.transform(this.addMemberLocker.value.fromDate, 'yyyy-MM-dd');
    let toDate = this.datepipe.transform(this.addMemberLocker.value.toDate, 'yyyy-MM-dd');
    this.userService.checkLockerAvailability(this.addMemberLocker.value.lockerId, fromDate,toDate)
    .subscribe((response: any) => {
      if (response.data.length > 0) {
          this.lockerUnavailableFlag = true;
      }else{
        this.lockerUnavailableFlag = false;
        return true;
      }
    });
  }
}

removeErrorFlagOnChange(){
  this.rollNoNullFlag = false;
  this.fromDateNullFlag = false;
  this.toDateNullFlag = false;
  this.lockerIdNullFlag = false;
  this.amountNullFlag = false;
  this.lockerUnavailableFlag = false;
}

formValidation(){
  this.removeErrorFlagOnChange();
  var validFlag = true;
  if(this.addMemberLocker.value.rollNo.trim() == ""){
    this.rollNoNullFlag = true;
    validFlag = false;
  }else if(this.addMemberLocker.value.fromDate == ""){
    this.fromDateNullFlag = true;
    validFlag = false;
  }else if(this.addMemberLocker.value.toDate == ""){
    this.toDateNullFlag = true;
    validFlag = false;
  }else if(this.addMemberLocker.value.lockerId.trim() == ""){
    this.lockerIdNullFlag = true;
    validFlag = false;
  }else if(this.addMemberLocker.value.amount.trim() == ""){
    this.amountNullFlag = true;
    validFlag = false;
  }else if(this.lockerUnavailableFlag){
    validFlag = false;
  }
  return validFlag;
}

}
