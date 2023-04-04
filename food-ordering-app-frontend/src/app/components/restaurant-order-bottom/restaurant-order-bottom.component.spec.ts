import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOrderBottomComponent } from './restaurant-order-bottom.component';

describe('RestaurantOrderBottomComponent', () => {
  let component: RestaurantOrderBottomComponent;
  let fixture: ComponentFixture<RestaurantOrderBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantOrderBottomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantOrderBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
