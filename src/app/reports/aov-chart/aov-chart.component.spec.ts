import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AovChartComponent } from './aov-chart.component';

describe('AovChartComponent', () => {
  let component: AovChartComponent;
  let fixture: ComponentFixture<AovChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AovChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AovChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
