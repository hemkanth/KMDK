import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberApprovalPeriodComponent } from './member-approval-period.component';

describe('MemberApprovalPeriodComponent', () => {
  let component: MemberApprovalPeriodComponent;
  let fixture: ComponentFixture<MemberApprovalPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberApprovalPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberApprovalPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
