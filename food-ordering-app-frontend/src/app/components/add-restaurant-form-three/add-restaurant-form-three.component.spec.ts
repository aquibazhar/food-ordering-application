import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantFormThreeComponent } from './add-restaurant-form-three.component';

describe('AddRestaurantFormThreeComponent', () => {
  let component: AddRestaurantFormThreeComponent;
  let fixture: ComponentFixture<AddRestaurantFormThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRestaurantFormThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRestaurantFormThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
