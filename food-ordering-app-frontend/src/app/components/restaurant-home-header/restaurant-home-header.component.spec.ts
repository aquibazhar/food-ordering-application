import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantHomeHeaderComponent } from './restaurant-home-header.component';

describe('RestaurantHomeHeaderComponent', () => {
  let component: RestaurantHomeHeaderComponent;
  let fixture: ComponentFixture<RestaurantHomeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantHomeHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantHomeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
