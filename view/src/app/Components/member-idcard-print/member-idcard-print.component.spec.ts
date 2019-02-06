import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberIdcardPrintComponent } from './member-idcard-print.component';

describe('MemberIdcardPrintComponent', () => {
  let component: MemberIdcardPrintComponent;
  let fixture: ComponentFixture<MemberIdcardPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberIdcardPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberIdcardPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
