import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../service/auth.service";
import { UserService } from "../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  login_uname: string = "";
  login_pwd: string = "";
  isLogin: boolean = true;
  public loading = false;

  public userNameNullFlag: boolean = false;
  public pwdNullFlag: boolean = false;
  public invalidLoginFlag: boolean = false;

  public responseStatus: string;
  public userData: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService) { }



  navigateToMemberScreen() {
    this.loading = true;
    if (this.mandatoryValidations()) {
      this.userData = { "emailId": this.login_uname, "password": this.login_pwd };
      this.userService.login(this.userData)
        .subscribe((response: any) => {
          if(response.status == "Success"){
            this.loading = false;
            this.router.navigate(['home']);
          }else if(response.status == "Failure"){
            this.loading = false;
            this.invalidLoginFlag = true;
          }
        });
    }
  }

  mandatoryValidations() {
    let successFlag = true;
    if (this.login_uname.trim() == "") {
      this.userNameNullFlag = true;
      successFlag = false;
      this.loading = false;
    }

    if (this.login_pwd.trim() == "") {
      this.pwdNullFlag = true;
      successFlag = false;
      this.loading = false;
    }
    return successFlag;
  }

  removeError(param: string){
    if(param == "uname"){
      this.userNameNullFlag = false;
      this.invalidLoginFlag = false;
    }else if(param == "pwd"){
      this.pwdNullFlag = false;
      this.invalidLoginFlag = false;
    }
  }

  ngOnInit() {
    this.isLogin = true;
  }



}
