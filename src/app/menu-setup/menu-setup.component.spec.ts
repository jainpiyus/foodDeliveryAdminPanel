import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSetupComponent } from './menu-setup.component';

describe('MenuSetupComponent', () => {
  let component: MenuSetupComponent;
  let fixture: ComponentFixture<MenuSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
