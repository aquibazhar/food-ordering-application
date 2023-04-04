import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDashboardTopComponent } from './restaurant-dashboard-top.component';

describe('RestaurantDashboardTopComponent', () => {
  let component: RestaurantDashboardTopComponent;
  let fixture: ComponentFixture<RestaurantDashboardTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantDashboardTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantDashboardTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
