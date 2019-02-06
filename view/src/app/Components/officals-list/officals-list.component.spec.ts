import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficalsListComponent } from './officals-list.component';

describe('OfficalsListComponent', () => {
  let component: OfficalsListComponent;
  let fixture: ComponentFixture<OfficalsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficalsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
