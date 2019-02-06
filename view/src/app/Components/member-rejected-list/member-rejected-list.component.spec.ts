import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRejectedListComponent } from './member-rejected-list.component';

describe('MemberRejectedListComponent', () => {
  let component: MemberRejectedListComponent;
  let fixture: ComponentFixture<MemberRejectedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRejectedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRejectedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
