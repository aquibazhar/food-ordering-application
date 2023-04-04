import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDashboardBottomComponent } from './restaurant-dashboard-bottom.component';

describe('RestaurantDashboardBottomComponent', () => {
  let component: RestaurantDashboardBottomComponent;
  let fixture: ComponentFixture<RestaurantDashboardBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantDashboardBottomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantDashboardBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
