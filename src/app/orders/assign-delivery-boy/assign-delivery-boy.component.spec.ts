import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDeliveryBoyComponent } from './assign-delivery-boy.component';

describe('AssignDeliveryBoyComponent', () => {
  let component: AssignDeliveryBoyComponent;
  let fixture: ComponentFixture<AssignDeliveryBoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDeliveryBoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDeliveryBoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
