import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerSurrenderComponent } from './locker-surrender.component';

describe('LockerSurrenderComponent', () => {
  let component: LockerSurrenderComponent;
  let fixture: ComponentFixture<LockerSurrenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockerSurrenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockerSurrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
