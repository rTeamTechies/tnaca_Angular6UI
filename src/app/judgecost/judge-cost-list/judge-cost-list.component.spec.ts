import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeCostListComponent } from './judge-cost-list.component';

describe('JudgeCostListComponent', () => {
  let component: JudgeCostListComponent;
  let fixture: ComponentFixture<JudgeCostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeCostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeCostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
