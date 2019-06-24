import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadmindashboardComponent } from './cadmindashboard.component';

describe('CadmindashboardComponent', () => {
  let component: CadmindashboardComponent;
  let fixture: ComponentFixture<CadmindashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadmindashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadmindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
