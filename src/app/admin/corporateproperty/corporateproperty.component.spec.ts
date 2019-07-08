import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatepropertyComponent } from './corporateproperty.component';

describe('CorporatepropertyComponent', () => {
  let component: CorporatepropertyComponent;
  let fixture: ComponentFixture<CorporatepropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporatepropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporatepropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
