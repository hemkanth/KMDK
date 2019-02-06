import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCertificateComponent } from './branch-certificate.component';

describe('BranchCertificateComponent', () => {
  let component: BranchCertificateComponent;
  let fixture: ComponentFixture<BranchCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
