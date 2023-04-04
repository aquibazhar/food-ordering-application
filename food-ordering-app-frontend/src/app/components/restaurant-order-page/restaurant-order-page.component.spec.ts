import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOrderPageComponent } from './restaurant-order-page.component';

describe('RestaurantOrderPageComponent', () => {
  let component: RestaurantOrderPageComponent;
  let fixture: ComponentFixture<RestaurantOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantOrderPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
