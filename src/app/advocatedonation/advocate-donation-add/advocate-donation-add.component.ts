import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../service/user.service";
import { ToastrService } from 'ngx-toastr';
import { Data } from '../../model/data.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-advocate-donation-add',
  templateUrl: './advocate-donation-add.component.html',
  styleUrls: ['./advocate-donation-add.component.css']
})
export class AdvocateDonationAddComponent implements OnInit {

  public addAdvDonationForm: FormGroup;
  public paymentTypes: any = ['CASH', 'CHEQUE', 'DD'];
  public generatedBillNo: string ="";
  public amountInWords: string = "";
    
  public a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  public b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
  public n : any;

  public advNameNullFlag: boolean = false;
  public amountNullFlag: boolean = false;
  public todayDate = this.datepipe.transform(new Date(), 'dd-MM-yyyy');

  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    public activeRoute: ActivatedRoute,
    private data: Data,public datepipe: DatePipe) { }

  ngOnInit() {
    if(sessionStorage.getItem("isLoggedIn") != "true"){
      this.router.navigate(["login"]);
    }else{
      this.addAdvDonationForm = this.formBuilder.group({
        advName: ['', Validators.required],
        amount : ['',Validators.required],
        paymentType: ['CASH'],
        billDate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd')]
      });
    }
  }

  onSubmit(){
    if(this.mandatoryValidationsPass()){
      this.userService.addAdvDonation(this.addAdvDonationForm.value)
      .subscribe((data : any) => {
        if(data.status == "Success"){
          this.generatedBillNo = data.billNo;
          this.amountInWords = this.inWords(this.addAdvDonationForm.value.amount);
          setTimeout(() => this.printAndClearForm(data), 350);
        }else if(data.status == "Failure"){
          this.toastr.error(data.message)
        }else{
          this.toastr.error("Error", "Something went wrong. Try again later..!")
        }
      });
    }
  }

  clearForm() {
    this.clearErrors();
    this.addAdvDonationForm.reset();
    this.addAdvDonationForm.controls.billDate.patchValue(this.datepipe.transform(new Date(), 'yyyy-MM-dd'));
    this.addAdvDonationForm.controls.paymentType.patchValue('CASH');
  }

  clearErrors(){
    this.advNameNullFlag = false;
    this.amountNullFlag = false;
  }


  printAndClearForm(data: any) {
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
  return str = str[0].toUpperCase() + str.slice(1);
}

mandatoryValidationsPass(){
  this.clearErrors();
  let success = true;
  if(this.addAdvDonationForm.value.advName == null || this.addAdvDonationForm.value.advName.trim() == ""){
    this.advNameNullFlag = true;
    success = false;  
  }else  if(this.addAdvDonationForm.value.amount == null || this.addAdvDonationForm.value.amount == 0){
    this.amountNullFlag = true;
    success = false;
  }
  return success;
}

}
