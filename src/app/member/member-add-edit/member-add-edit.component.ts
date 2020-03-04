import { Component, OnInit, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../service/auth.service";
import { UserService } from "../../service/user.service";
import { ToastrService } from 'ngx-toastr';
import { Data } from '../../model/data.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

enum CheckBoxType { LIFE_TIME_MEMBER, WELFARE_FUND_MEMBER, IN_ACTIVE, NONE };

@Component({
  selector: 'app-member-add-edit',
  templateUrl: './member-add-edit.component.html',
  styleUrls: ['./member-add-edit.component.css']
})
export class MemberAddEditComponent implements OnInit {
  
  public bsValue = new Date();
  public editFlag: boolean = false;
  public loading: boolean = false;
  public addForm: FormGroup;
  public flagForm: FormGroup;
  public memberRollNo: any;
  public inActiveTypes: any = ['REMOVED', 'PROMOTED AS ADVOCATE', 'DEMISE', 'OTHERS'];
  public rollNullFlag: boolean = false;
  public nameNullFlag: boolean = false;
  check_box_type = CheckBoxType;
  currentlyChecked: CheckBoxType;
  public modalRef: BsModalRef;
  public rollNoExistFlag: boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthenticationService,
    private userService: UserService,
    private toastr: ToastrService,
    public activeRoute: ActivatedRoute,
    private data: Data,
    public datepipe: DatePipe,
    public modalService: BsModalService) {
      this.loading = true;
      if(this.data.memberDataTransfer && this.data.memberDataTransfer.member_id != undefined && this.data.memberDataTransfer.member_id != ""){
        this.editFlag = true;
      }
    }

  ngOnInit() {
    this.loading = true;
    if(this.editFlag){
      this.memberRollNo = this.data.memberDataTransfer.roll_no;

      this.flagForm = this.formBuilder.group({
        welfareFundMemberFlag : [false],
        lifeTimeMemberFlag: [false],
        isInActiveMember: [false],
        inActiveType : ['REMOVED']
      });

      this.addForm = this.formBuilder.group({     
        memberId: [this.data.memberDataTransfer.member_id],
        rollNo: [this.data.memberDataTransfer.roll_no, Validators.required],
        name: [this.data.memberDataTransfer.name, Validators.required],
        mobileNumber: [this.data.memberDataTransfer.mobile_number,Validators.required],
        homeAddress : [this.data.memberDataTransfer.home_address],
        dob: [new Date(this.datepipe.transform(this.data.memberDataTransfer.dob, 'yyyy/MM/dd'))],
        doj: [new Date(this.datepipe.transform(this.data.memberDataTransfer.doj, 'yyyy/MM/dd'))],
        officeAddress: [this.data.memberDataTransfer.office_address],
        advocateName: [this.data.memberDataTransfer.advocate_name],
        fatherName: [this.data.memberDataTransfer.father_name],
        email: [this.data.memberDataTransfer.email],
        bloodGroup: [this.data.memberDataTransfer.blood_group],
        advocateHomeAddress: [this.data.memberDataTransfer.advocate_home_address],
        advocateOfficeAddress: [this.data.memberDataTransfer.advocate_office_address],
        advocateMobileNumber: [this.data.memberDataTransfer.advocate_mobile_number],
        advocateEmail: [this.data.memberDataTransfer.advocate_email],
        activeFlag : [this.data.memberDataTransfer.active_flag],
        inactiveReason : [''],
        membershipFlag : [this.data.memberDataTransfer.membership_flag],
        welfareFundMemberFlag : [this.data.memberDataTransfer.welfare_fund_member === undefined ? 0 : 1],
        lifeTimeMemberFlag: [this.data.memberDataTransfer.lifetime_member_flag === undefined ? 0 : 1],
        isInActiveMember: [this.data.memberDataTransfer.active_flag === 1 ? 0 : 1]   
      });
      setTimeout(() => this.updateCheckBoxes(), 350);
      this.loading = false;
    }else{ 
      this.flagForm = this.formBuilder.group({  
        welfareFundMemberFlag : [false],
        lifeTimeMemberFlag: [false],
        isInActiveMember: [false],
        inActiveType : ['REMOVED']
      });
      this.addForm = this.formBuilder.group({      
        rollNo: ['', Validators.required],
        name: ['', Validators.required],
        mobileNumber: ['',Validators.required],
        homeAddress : [],
        dob: [''],
        doj: [''],
        officeAddress: [],
        advocateName: [],
        fatherName: [],
        email: [],
        bloodGroup: [],
        advocateHomeAddress: [],
        advocateOfficeAddress: [],
        advocateMobileNumber: [],
        advocateEmail: [''],
        activeFlag : [1],
        inactiveReason : [''],
        membershipFlag : [1],
        welfareFundMemberFlag : [0],
        lifeTimeMemberFlag: [0],
        isInActiveMember: [0]
      });
      this.loading = false;
    }
   
  }

  updateCheckBoxes(){
     this.flagForm = this.formBuilder.group({  
        welfareFundMemberFlag : [this.data.memberDataTransfer.welfare_fund_member === 1 ? true : false],
        lifeTimeMemberFlag: [this.data.memberDataTransfer.lifetime_member_flag === 1 ? true : false],
        isInActiveMember: [this.data.memberDataTransfer.active_flag === 1 ? false : true],
        inActiveType:[this.data.memberDataTransfer.inactive_reason]
      });

      if(this.data.memberDataTransfer.active_flag != 1){
        this.selectCheckBox(2);
      }
  }

  selectCheckBox(targetType: CheckBoxType) {
    if(this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      return;
    }
    this.currentlyChecked = targetType;
  }

  onSubmit(template: TemplateRef<any>) {
      this.addForm.controls.activeFlag.patchValue(this.flagForm.controls.isInActiveMember.value === true ? 0 : 1);
      this.addForm.controls.welfareFundMemberFlag.patchValue(this.flagForm.controls.welfareFundMemberFlag.value === true ? 1 : 0);
      this.addForm.controls.lifeTimeMemberFlag.patchValue(this.flagForm.controls.lifeTimeMemberFlag.value === true ? 1 : 0);

      if(this.flagForm.controls.isInActiveMember.value == true) {
        this.addForm.controls.inactiveReason.patchValue(this.flagForm.controls.inActiveType.value);
      }

      this.addForm.controls.dob.patchValue(this.datepipe.transform(this.addForm.value.dob, 'yyyy-MM-dd'));
      this.addForm.controls.doj.patchValue(this.datepipe.transform(this.addForm.value.doj, 'yyyy-MM-dd'));

      if(this.checkMandatoryFields()){
        if(this.editFlag){
          this.userService.editMember(this.addForm.value)
          .subscribe((data : any) => {
            if(data.status == "Success"){
              this.toastr.success(data.message);
              this.clearForm();
              this.router.navigate(["member-list"]);
            }else if(data.status == "Failure"){
              this.toastr.error(data.message)
            }else{
              this.toastr.error("Error", "Something went wrong. Try again later..!")
            }
          });
        }else {
          this.userService.addMember(this.addForm.value)
          .subscribe((data : any) => {
            if(data.status == "Success"){
              this.toastr.success(data.message);
              this.clearForm();
            }else if(data.status == "Failure"){
              this.toastr.error(data.message)
            }else{
              this.toastr.error("Error", "Something went wrong. Try again later..!")
            }
          });
        }
      }else{

      }  
  }

  clearForm(){
    this.addForm.reset();
    this.flagForm.reset();
    this.flagForm.controls.inActiveType.patchValue('REMOVED');
    this.currentlyChecked = 0;
  }

  getRollNoDetails() {
    this.userService.getMemberByRollNo(this.addForm.value.rollNo)
      .subscribe((response: any) => {
        if (response.data.length > 0) {
          this.rollNoExistFlag = true;
          this.flagForm = this.formBuilder.group({  
            welfareFundMemberFlag : [response.data[0].welfare_fund_member === 1 ? true : false],
            lifeTimeMemberFlag: [response.data[0].lifetime_member_flag === 1 ? true : false],
            isInActiveMember: [response.data[0].activeFlag === 1 ? true : false],
            inActiveType : ['Removed']
          });
          this.addForm = this.formBuilder.group({      
            rollNo: [response.data[0].roll_no, Validators.required],
            name: [response.data[0].name, Validators.required],
            mobileNumber: [response.data[0].mobile_number,Validators.required],
            homeAddress : [response.data[0].home_address],
            dob: [new Date(response.data[0].dob)],
            doj: [new Date(response.data[0].doj)],
            officeAddress: [response.data[0].office_address],
            advocateName: [response.data[0].advocate_name],
            fatherName: [response.data[0].father_name],
            email: [response.data[0].email],
            bloodGroup: [response.data[0].blood_group],
            advocateHomeAddress: [response.data[0].advocate_home_address],
            advocateOfficeAddress: [response.data[0].advocate_office_address],
            advocateMobileNumber: [response.data[0].advocate_mobile_number],
            advocateEmail: [response.data[0].advocate_email],
            activeFlag : [1],
            membershipFlag : [1],
            welfareFundMemberFlag : [true],
            lifeTimeMemberFlag: [''],
            isInActiveMember: ['']
          });
          this.toastr.error("Error", "Roll No Already Exist.")
        }else{
          this.rollNoExistFlag = false;
          const enteredRollNo = this.addForm.controls.rollNo.value;
          this.addForm.reset();
          this.addForm.controls.rollNo.patchValue(enteredRollNo);
          this.addForm.controls.activeFlag.patchValue(1);
          this.addForm.controls.membershipFlag.patchValue(1);

        }
      });
  }

  checkMandatoryFields(){
    let successFlag = true;
    if (this.addForm.value.rollNo == "") {
      this.rollNullFlag = true;
      successFlag = false;
      this.loading = false;
    }

    if (this.addForm.value.name == "") {
      this.nameNullFlag = true;
      successFlag = false;
      this.loading = false;
    }
    return successFlag;
  }

  removeError(param: string){
    if(param == "name"){
      this.nameNullFlag = false;
    }else if(param == "rollNo"){
      this.rollNullFlag = false;
    }
  }

}
