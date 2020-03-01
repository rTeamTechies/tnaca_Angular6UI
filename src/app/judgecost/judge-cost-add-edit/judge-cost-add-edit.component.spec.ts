import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeCostAddEditComponent } from './judge-cost-add-edit.component';

describe('JudgeCostAddEditComponent', () => {
  let component: JudgeCostAddEditComponent;
  let fixture: ComponentFixture<JudgeCostAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeCostAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeCostAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
