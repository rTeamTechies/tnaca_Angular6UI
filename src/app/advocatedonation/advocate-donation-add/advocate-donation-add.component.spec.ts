import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateDonationAddComponent } from './advocate-donation-add.component';

describe('AdvocateDonationAddComponent', () => {
  let component: AdvocateDonationAddComponent;
  let fixture: ComponentFixture<AdvocateDonationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvocateDonationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvocateDonationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
