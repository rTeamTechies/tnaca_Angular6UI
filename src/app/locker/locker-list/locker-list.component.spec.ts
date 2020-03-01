import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerListComponent } from './locker-list.component';

describe('LockerListComponent', () => {
  let component: LockerListComponent;
  let fixture: ComponentFixture<LockerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
