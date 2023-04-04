import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { FoodItem } from 'src/app/models/food-item';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CartDiscardDialogComponent } from '../cart-discard-dialog/cart-discard-dialog.component';
import { RedirectDialogComponent } from '../redirect-dialog/redirect-dialog.component';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
// export class MenuItemComponent implements OnChanges {
export class MenuItemComponent {
  mealType: string = 'veg';

  foodCartMap: Map<number, number>;

  @Input() foodItems: FoodItem[] = [];
  @Input() searchInput: string = 'default';
  // @Input() parentComponent: string = 'form-three';
  @Input() parentComponent: string = 'form-three';
  @Output() onDelete: EventEmitter<number | null> = new EventEmitter<
    number | null
  >();
  @Output() cartChanged: EventEmitter<string> = new EventEmitter<string>();

  userEmail: string = '';
  userId: string = '';

  cartItems: Cart[] = [];

  restaurantId: number;

  @Output() emptyList: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private restaurantService: RestaurantService,
    private foodService: FoodService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.foodCartMap = new Map<number, number>();
    const email = sessionStorage.getItem('email');
    this.userEmail = email === null ? '' : email;

    const id = sessionStorage.getItem('userId');
    this.userId = id === null ? '' : id;

    this.restaurantId = Number(
      this.activatedRoute.snapshot.params['restaurantId']
    );

    console.log(this.restaurantId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let change in changes) {
      if (change === 'parentComponent') {
        // console.log(change);
        this.parentComponent = changes[change].currentValue;
        if (this.parentComponent === 'order') {
          this.getCartItems();
        }
      }
      if (change === 'foodItems') {
        // console.log(change);
        this.foodItems = changes[change].currentValue;
        this.foodItems.forEach((foodItem) => {
          this.foodCartMap.set(foodItem.id, 0);
        });
      }
    }
  }

  onItemDelete(id: number | null) {
    this.onDelete.emit(id);
    this.foodItems = this.foodItems.filter((item) => {
      item.id !== id;
    });
    if (this.foodItems.length === 1) {
      console.log('its 1');
    }

    if (this.foodItems.length === 0) {
      this.emptyList.emit('List is empty');
    }
  }

  getCartItems() {
    this.cartService
      .getCartItemsByUserId(Number(this.userId))
      .subscribe((data) => {
        console.log(data);
        this.cartItems = data;
        this.cartItems.forEach((cartItem) => {
          this.foodCartMap.set(cartItem.foodItemId, cartItem.quantity);
          console.log(this.foodCartMap);
        });
      });
  }

  firstAdd(foodItemId: number) {
    let newCartItem = new Cart(
      0,
      foodItemId,
      Number(this.userId),
      1,
      this.restaurantId
    );

    this.cartService.addCartItem(newCartItem).subscribe(
      (data) => {
        this.cartItems.push(data);
        this.foodCartMap.set(data.foodItemId, data.quantity);
        this.cartChanged.emit('added');
      },
      (error) => {
        this.openCartDiscardDialog(foodItemId);
      }
    );
  }

  addMoreThanOne(foodItemId: number) {
    let currentQuantity = this.foodCartMap.get(foodItemId)!;
    let cartItemId = 0;

    this.cartItems.forEach((cartItem) => {
      if (cartItem.foodItemId === foodItemId) {
        cartItemId = cartItem.id;
      }
    });

    let updatedCartItem = new Cart(
      cartItemId,
      foodItemId,
      Number(this.userId),
      currentQuantity + 1,
      this.restaurantId
    );

    this.cartService.updateCartItem(updatedCartItem).subscribe((data) => {
      this.cartItems.push(data);
      this.foodCartMap.set(data.foodItemId, data.quantity);
      this.cartChanged.emit('added');
    });
  }

  removeOne(foodItemId: number) {
    let currentQuantity = this.foodCartMap.get(foodItemId)!;
    let cartItemId = 0;

    this.cartItems.forEach((cartItem) => {
      if (cartItem.foodItemId === foodItemId) {
        cartItemId = cartItem.id;
      }
    });
    if (currentQuantity > 1) {
      let updatedCartItem = new Cart(
        cartItemId,
        foodItemId,
        Number(this.userId),
        currentQuantity - 1,
        this.restaurantId
      );
      this.cartService.updateCartItem(updatedCartItem).subscribe((data) => {
        this.cartItems.push(data);
        this.foodCartMap.set(data.foodItemId, data.quantity);
        this.cartChanged.emit('added');
      });
    } else {
      this.cartService.deleteCartItem(cartItemId).subscribe((data) => {
        console.log(data);
        this.foodCartMap.set(foodItemId, 0);
        this.cartChanged.emit('added');
      });
    }
  }

  openCartDiscardDialog(foodItemId: number) {
    this.restaurantService
      .getRestaurantById(this.cartItems[0].restaurantId)
      .subscribe((oldCartRestaurant) => {
        this.restaurantService
          .getRestaurantById(this.restaurantId)
          .subscribe((newCartRestaurant) => {
            const dialogRef = this.dialog.open(CartDiscardDialogComponent, {
              data: {
                title: 'Replace cart item',
                subtitle:
                  'Your cart contains dishes from ' +
                  oldCartRestaurant.name +
                  '. Do you want to discard the selection and add dishes from ' +
                  newCartRestaurant.name +
                  '?',
                buttonText: 'Replace',
              },
            });

            dialogRef.afterClosed().subscribe((confirmation) => {
              if (confirmation) {
                this.cartService
                  .deleteCartItem(this.cartItems[0].id)
                  .subscribe((data) => {
                    this.firstAdd(foodItemId);
                  });
              }
            });

            dialogRef.afterClosed().subscribe((result) => {
              console.log(`Dialog result: ${result}`);
            });
          });
      });
  }
}
