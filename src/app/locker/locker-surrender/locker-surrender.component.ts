import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../service/auth.service";
import { UserService } from "../../service/user.service";
import { ToastrService } from 'ngx-toastr';
import { Data } from '../../model/data.model';


@Component({
  selector: 'app-locker-surrender',
  templateUrl: './locker-surrender.component.html',
  styleUrls: ['./locker-surrender.component.css']
})
export class LockerSurrenderComponent implements OnInit {

  public surrenderMemberLocker: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthenticationService,
    private userService: UserService,
    private toastr: ToastrService,
    public activeRoute: ActivatedRoute,
    private data: Data,
    public datepipe: DatePipe) { }

  ngOnInit() {
    this.surrenderMemberLocker = this.formBuilder.group({
      billNo: [''], 
    });
  }

  onSubmit() {
    this.userService.surrenderLocker(this.surrenderMemberLocker.controls.billNo.value)
    .subscribe((data : any) => {
      this.clearForm();
      this.toastr.success("Locker Surrendered Successfully");
    });
  }

  clearForm(){
    this.surrenderMemberLocker.reset();
  }

}
