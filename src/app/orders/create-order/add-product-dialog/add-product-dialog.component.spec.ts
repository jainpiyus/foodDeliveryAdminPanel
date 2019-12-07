import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductDialogComponent } from './add-product-dialog.component';

describe('AddProductDialogComponent', () => {
  let component: AddProductDialogComponent;
  let fixture: ComponentFixture<AddProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
