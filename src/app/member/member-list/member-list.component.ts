import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { UserService } from "../../service/user.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router, NavigationExtras } from "@angular/router";
import { Data } from '../../model/data.model';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{

  public menu1Active = true;
  public subMenu1Active = true;

  public responseData : any;
  public filteredData : any;
  name: string;
  modalRef: BsModalRef;
  public loading = false;
  search;
  public memberCount: number;
  public memberViewData: any;


  constructor(
    private userService: UserService,
    public modalService: BsModalService,
    private router: Router,
    public data: Data
    ){ 
      this.loading = true;
    }

  ngOnInit(){
    this.menu1Active = true;
    //this.loading = true;
    this.userService.getMemberList()
    .subscribe((response : any) => {
      this.memberCount = response.data.length;
      this.responseData = response.data;
      this.filteredData = response.data;
      this.loading = false;
    });
  }

  filter(term: string) {
    if(!term) {
      this.responseData = this.responseData;
    } else {
      this.responseData = this.filteredData.filter(x => 
         x.name.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }


  openMemberModal(item: any, template: TemplateRef<any>){
    this.name = item.name;
    this.memberViewData = item;
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    }); 
  }

  openEditScreen(item: any){
    this.loading = true;
    this.data.memberDataTransfer = item;
    this.router.navigate(["member-add-edit"]);
  };

  openPaymentScreen(item: any){
    this.loading = true;
    this.data.memberDataTransfer = item;
    this.router.navigate(["member-payment"]);
  }

  openAddLockerScreen(item: any){
    this.loading = true;
    this.data.memberDataTransfer = item;
    this.router.navigate(["locker-add-edit"]);
  }
}

