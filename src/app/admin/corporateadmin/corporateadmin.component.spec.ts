import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateadminComponent } from './corporateadmin.component';

describe('CorporateadminComponent', () => {
  let component: CorporateadminComponent;
  let fixture: ComponentFixture<CorporateadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
