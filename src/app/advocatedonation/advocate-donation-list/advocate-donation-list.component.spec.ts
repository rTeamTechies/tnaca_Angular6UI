import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvocateDonationListComponent } from './advocate-donation-list.component';

describe('AdvocateDonationListComponent', () => {
  let component: AdvocateDonationListComponent;
  let fixture: ComponentFixture<AdvocateDonationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvocateDonationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvocateDonationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
