import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(public modalService: BsModalService,private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("isLoggedIn") != "true"){
      this.router.navigate(["login"]);
    }
  }

  openContactInfoPage(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    }); 
  }

}
