import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDashboardHeaderComponent } from './restaurant-dashboard-header.component';

describe('RestaurantDashboardHeaderComponent', () => {
  let component: RestaurantDashboardHeaderComponent;
  let fixture: ComponentFixture<RestaurantDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantDashboardHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
