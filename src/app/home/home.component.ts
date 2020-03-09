import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(public modalService: BsModalService,) { }

  ngOnInit() {
  }

  openContactInfoPage(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    }); 
  }

}
