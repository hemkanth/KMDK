import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionOfficialsComponent } from './division-officials.component';

describe('DivisionOfficialsComponent', () => {
  let component: DivisionOfficialsComponent;
  let fixture: ComponentFixture<DivisionOfficialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionOfficialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionOfficialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
