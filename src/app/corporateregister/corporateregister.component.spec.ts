import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateregisterComponent } from './corporateregister.component';

describe('CorporateregisterComponent', () => {
  let component: CorporateregisterComponent;
  let fixture: ComponentFixture<CorporateregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
