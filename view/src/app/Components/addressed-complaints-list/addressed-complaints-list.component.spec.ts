import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressedComplaintsListComponent } from './addressed-complaints-list.component';

describe('AddressedComplaintsListComponent', () => {
  let component: AddressedComplaintsListComponent;
  let fixture: ComponentFixture<AddressedComplaintsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressedComplaintsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressedComplaintsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
