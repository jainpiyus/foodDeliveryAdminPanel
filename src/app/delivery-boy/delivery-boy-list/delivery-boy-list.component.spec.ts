import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBoyListComponent } from './delivery-boy-list.component';

describe('DeliveryBoyListComponent', () => {
  let component: DeliveryBoyListComponent;
  let fixture: ComponentFixture<DeliveryBoyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
