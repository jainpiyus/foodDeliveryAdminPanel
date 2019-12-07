import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBoyComponent } from './delivery-boy.component';

describe('DeliveryBoyComponent', () => {
  let component: DeliveryBoyComponent;
  let fixture: ComponentFixture<DeliveryBoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
