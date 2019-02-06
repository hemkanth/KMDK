import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementTypeComponent } from './advertisement-type.component';

describe('AdvertisementTypeComponent', () => {
  let component: AdvertisementTypeComponent;
  let fixture: ComponentFixture<AdvertisementTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisementTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
