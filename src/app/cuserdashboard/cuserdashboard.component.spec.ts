import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuserdashboardComponent } from './cuserdashboard.component';

describe('CuserdashboardComponent', () => {
  let component: CuserdashboardComponent;
  let fixture: ComponentFixture<CuserdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuserdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuserdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
