import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyAffiliationComponent } from './party-affiliation.component';

describe('PartyAffiliationComponent', () => {
  let component: PartyAffiliationComponent;
  let fixture: ComponentFixture<PartyAffiliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyAffiliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyAffiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
