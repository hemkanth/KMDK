import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberApprovalListComponent } from './member-approval-list.component';

describe('MemberApprovalListComponent', () => {
  let component: MemberApprovalListComponent;
  let fixture: ComponentFixture<MemberApprovalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberApprovalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
