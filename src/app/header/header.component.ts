import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public menu1Active: boolean = false;
  public menu2Active: boolean = false;
  public menu3Active: boolean = false;
  public menu4Active: boolean = false;
  public menu5Active: boolean = false;

  public subMenu1Active: boolean = false;
  public subMenu2Active: boolean = false;
  public subMenu3Active: boolean = false;

  constructor(private location: Location) { }

  ngOnInit() {
    if (this.location.path() == "/member-list") {
      this.menu1Active = true;
      this.subMenu1Active = true;
    } else if (this.location.path() == "/member-add-edit") {
      this.menu1Active = true;
      this.subMenu2Active = true;
    } else if (this.location.path() == "/member-payment") {
      this.menu1Active = true;
      this.subMenu3Active = true;      
    }

  }
}
