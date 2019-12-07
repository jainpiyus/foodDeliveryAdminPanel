import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorChartComponent } from './visitor-chart.component';

describe('VisitorChartComponent', () => {
  let component: VisitorChartComponent;
  let fixture: ComponentFixture<VisitorChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
