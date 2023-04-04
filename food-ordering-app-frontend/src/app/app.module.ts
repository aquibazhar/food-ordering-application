import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './modules/ng-material/ng-material.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPasswordValidatorDirective } from './directives/confirm-password-validator.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomeCardsComponent } from './components/home-cards/home-cards.component';
import { RestaurantHomeComponent } from './components/restaurant-home/restaurant-home.component';
import { RestaurantHomeHeaderComponent } from './components/restaurant-home-header/restaurant-home-header.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { AddRestaurantFormOneComponent } from './components/add-restaurant-form-one/add-restaurant-form-one.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AddRestaurantFormTwoComponent } from './components/add-restaurant-form-two/add-restaurant-form-two.component';
import { SearchComparePipe } from './pipes/search-compare.pipe';
import { AddRestaurantFormThreeComponent } from './components/add-restaurant-form-three/add-restaurant-form-three.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { TimeValidatorDirective } from './directives/time-validator.directive';
import { CommonModule, DatePipe } from '@angular/common';
import { AtleastOneCuisineSelectedValidatorDirective } from './directives/atleast-one-cuisine-selected-validator.directive';
import { RestaurantDashboardComponent } from './components/restaurant-dashboard/restaurant-dashboard.component';
import { RestaurantDashboardHeaderComponent } from './components/restaurant-dashboard-header/restaurant-dashboard-header.component';
import { RestaurantDashboardTopComponent } from './components/restaurant-dashboard-top/restaurant-dashboard-top.component';
import { RestaurantDashboardBottomComponent } from './components/restaurant-dashboard-bottom/restaurant-dashboard-bottom.component';
import { RestaurantOrderPageComponent } from './components/restaurant-order-page/restaurant-order-page.component';
import { RestaurantOrderBottomComponent } from './components/restaurant-order-bottom/restaurant-order-bottom.component';
import { CuisineSeparatorPipe } from './pipes/cuisine-separator.pipe';
import { MenuCategoryComponent } from './components/menu-category/menu-category.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CartHeaderComponent } from './components/cart-header/cart-header.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SearchComponent } from './components/search/search.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { SearchCardComponent } from './components/search-card/search-card.component';
import { DistanceEstimationPipe } from './pipes/distance-estimation.pipe';
import { FilterFoodItemsPipe } from './pipes/filter-food-items.pipe';
import { RedirectDialogComponent } from './components/redirect-dialog/redirect-dialog.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { UserAddressesComponent } from './components/user-addresses/user-addresses.component';
import { AddNewAddressComponent } from './components/add-new-address/add-new-address.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { SelectAddressComponent } from './components/select-address/select-address.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { PendingOrdersComponent } from './components/pending-orders/pending-orders.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminApprovalTabComponent } from './components/admin-approval-tab/admin-approval-tab.component';
import { AdminManageTabComponent } from './components/admin-manage-tab/admin-manage-tab.component';
import { CartDiscardDialogComponent } from './components/cart-discard-dialog/cart-discard-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignUpComponent,
    ConfirmPasswordValidatorDirective,
    SignInComponent,
    HomeComponent,
    HomeHeaderComponent,
    HomeCardsComponent,
    RestaurantHomeComponent,
    RestaurantHomeHeaderComponent,
    AddRestaurantComponent,
    AddRestaurantFormOneComponent,
    ChangePasswordComponent,
    AddRestaurantFormTwoComponent,
    SearchComparePipe,
    AddRestaurantFormThreeComponent,
    UploadImageComponent,
    MenuItemComponent,
    TimeValidatorDirective,
    AtleastOneCuisineSelectedValidatorDirective,
    RestaurantDashboardComponent,
    RestaurantDashboardHeaderComponent,
    RestaurantDashboardTopComponent,
    RestaurantDashboardBottomComponent,
    RestaurantOrderPageComponent,
    RestaurantOrderBottomComponent,
    CuisineSeparatorPipe,
    MenuCategoryComponent,
    CartPageComponent,
    CartHeaderComponent,
    CartItemComponent,
    SearchComponent,
    AddAddressComponent,
    SearchCardComponent,
    DistanceEstimationPipe,
    FilterFoodItemsPipe,
    RedirectDialogComponent,
    PlaceOrderComponent,
    UserProfileComponent,
    UpdateProfileComponent,
    UserAddressesComponent,
    AddNewAddressComponent,
    EditAddressComponent,
    OrderHistoryComponent,
    SelectAddressComponent,
    OrderStatusComponent,
    PendingOrdersComponent,
    AdminComponent,
    AdminHeaderComponent,
    AdminApprovalTabComponent,
    AdminManageTabComponent,
    CartDiscardDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [DatePipe],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: AuthInterceptorService,
  //   multi:true
  // }],
  bootstrap: [AppComponent],
})
export class AppModule {}
