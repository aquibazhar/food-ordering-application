import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { RestaurantDashboardComponent } from './components/restaurant-dashboard/restaurant-dashboard.component';
import { RestaurantHomeComponent } from './components/restaurant-home/restaurant-home.component';
import { RestaurantOrderPageComponent } from './components/restaurant-order-page/restaurant-order-page.component';
import { SearchComponent } from './components/search/search.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'partner-with-us', component: RestaurantHomeComponent },
  { path: 'partner-with-us/add-restaurant', component: AddRestaurantComponent },
  { path: 'order/:restaurantId', component: RestaurantOrderPageComponent },
  { path: 'search/:searchInput', component: SearchComponent },
  { path: 'cart/:restaurantId', component: CartPageComponent },
  { path: 'order-status/:orderId', component: OrderStatusComponent },
  { path: 'admin', component: AdminComponent },

  {
    path: 'partner-with-us/restaurant-dashboard',
    component: RestaurantDashboardComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
