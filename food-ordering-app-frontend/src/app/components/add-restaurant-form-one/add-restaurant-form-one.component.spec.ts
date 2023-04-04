import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantFormOneComponent } from './add-restaurant-form-one.component';

describe('AddRestaurantFormOneComponent', () => {
  let component: AddRestaurantFormOneComponent;
  let fixture: ComponentFixture<AddRestaurantFormOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRestaurantFormOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRestaurantFormOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
