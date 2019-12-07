import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAbandonmentChartComponent } from './cart-abandonment-chart.component';

describe('CartAbandonmentChartComponent', () => {
  let component: CartAbandonmentChartComponent;
  let fixture: ComponentFixture<CartAbandonmentChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartAbandonmentChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAbandonmentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
