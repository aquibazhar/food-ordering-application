import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantFormTwoComponent } from './add-restaurant-form-two.component';

describe('AddRestaurantFormTwoComponent', () => {
  let component: AddRestaurantFormTwoComponent;
  let fixture: ComponentFixture<AddRestaurantFormTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRestaurantFormTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRestaurantFormTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
