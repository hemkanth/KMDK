import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialDesignationComponent } from './official-designation.component';

describe('OfficialDesignationComponent', () => {
  let component: OfficialDesignationComponent;
  let fixture: ComponentFixture<OfficialDesignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialDesignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
