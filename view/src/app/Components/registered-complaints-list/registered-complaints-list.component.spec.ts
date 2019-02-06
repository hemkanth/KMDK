import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredComplaintsListComponent } from './registered-complaints-list.component';

describe('RegisteredComplaintsListComponent', () => {
  let component: RegisteredComplaintsListComponent;
  let fixture: ComponentFixture<RegisteredComplaintsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredComplaintsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredComplaintsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
