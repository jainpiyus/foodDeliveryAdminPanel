import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryBoyComponent } from './add-delivery-boy.component';

describe('AddDeliveryBoyComponent', () => {
  let component: AddDeliveryBoyComponent;
  let fixture: ComponentFixture<AddDeliveryBoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeliveryBoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeliveryBoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
