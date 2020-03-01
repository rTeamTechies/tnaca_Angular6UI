import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerAddEditComponent } from './locker-add-edit.component';

describe('LockerAddEditComponent', () => {
  let component: LockerAddEditComponent;
  let fixture: ComponentFixture<LockerAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockerAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockerAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
