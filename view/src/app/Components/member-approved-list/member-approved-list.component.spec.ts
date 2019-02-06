import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberApprovedListComponent } from './member-approved-list.component';

describe('MemberApprovedListComponent', () => {
  let component: MemberApprovedListComponent;
  let fixture: ComponentFixture<MemberApprovedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberApprovedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberApprovedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
