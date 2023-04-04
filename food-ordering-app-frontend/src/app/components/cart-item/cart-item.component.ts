import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Food } from 'src/app/models/food';
import { FoodCart } from 'src/app/models/food-cart';
import { FoodItem } from 'src/app/models/food-item';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  mealType: string = 'veg';

  grandTotal: number = 0;

  deliveryFee: number = 51;

  combinedFoodCart: FoodCart[] = [];

  preparationTime: number = 10;

  @Input() cartItems: Cart[] = [];

  @Input() userId: number = 0;

  @Input() estimatedTime: number = 0;

  @Input() estimatedDistance: number = 0;

  @Output() onDelete: EventEmitter<number | null> = new EventEmitter<
    number | null
  >();
  @Output() cartChanged: EventEmitter<string> = new EventEmitter<string>();

  @Output() emptyList: EventEmitter<string> = new EventEmitter<string>();

  @Output() totalCost: EventEmitter<number> = new EventEmitter<number>();
  @Output() combinedFoodCartItems: EventEmitter<FoodCart[]> = new EventEmitter<
    FoodCart[]
  >();

  restaurantId: string = '';

  constructor(
    private restaurantService: RestaurantService,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    console.log(this.cartItems);
    console.log('called');
    this.deliveryFee =
      Math.round(this.estimatedDistance) < 1
        ? 15
        : 15 + Math.round(this.estimatedDistance) * 5;

    this.restaurantId = this.activatedRoute.snapshot.params['restaurantId'];
    console.log(this.restaurantId);
  }
  ngOnInit(): void {
    this.mapCartItems();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  mapCartItems() {
    this.cartItems.forEach((cartItem) => {
      this.foodService
        .getSpecificFoodItem(cartItem.foodItemId)
        .subscribe((data) => {
          this.combinedFoodCart.push(
            new FoodCart(cartItem.id, data, cartItem.quantity)
          );
          console.log(this.combinedFoodCart);
          this.calculateTotalPrice();
        });
    });
  }

  addOne(foodCart: FoodCart) {
    let newCartItem = new Cart(
      foodCart.cartId,
      foodCart.foodItem.id,
      this.userId,
      foodCart.quantity + 1,
      foodCart.foodItem.restaurantId
    );

    this.cartService.updateCartItem(newCartItem).subscribe((data) => {
      let index = this.combinedFoodCart.findIndex(
        (fc) => fc.cartId === foodCart.cartId
      );

      this.combinedFoodCart[index] = new FoodCart(
        foodCart.cartId,
        foodCart.foodItem,
        foodCart.quantity + 1
      );
      this.grandTotal = 0;
      this.calculateTotalPrice();
    });
  }

  removeOne(foodCart: FoodCart) {
    if (foodCart.quantity !== 1) {
      let newCartItem = new Cart(
        foodCart.cartId,
        foodCart.foodItem.id,
        this.userId,
        foodCart.quantity - 1,
        foodCart.foodItem.restaurantId
      );

      this.cartService.updateCartItem(newCartItem).subscribe((data) => {
        let index = this.combinedFoodCart.findIndex(
          (fc) => fc.cartId === foodCart.cartId
        );

        this.combinedFoodCart[index] = new FoodCart(
          foodCart.cartId,
          foodCart.foodItem,
          foodCart.quantity - 1
        );
        this.grandTotal = 0;
        this.calculateTotalPrice();
      });
    } else {
      this.cartService.deleteCartItem(foodCart.cartId).subscribe((data) => {
        let index = this.combinedFoodCart.findIndex(
          (fc) => fc.cartId === foodCart.cartId
        );
        this.combinedFoodCart.splice(index, 1);
        if (this.combinedFoodCart.length === 0) {
          this.router.navigateByUrl('/home');
        }
        this.grandTotal = 0;
        this.calculateTotalPrice();
      });
    }
  }

  calculateTotalPrice() {
    let total = 0;
    this.combinedFoodCart.forEach((foodCart) => {
      total = total + foodCart.foodItem.price * foodCart.quantity;
    });
    this.grandTotal = total;
    this.totalCost.emit(this.grandTotal + this.deliveryFee);
    this.combinedFoodCartItems.emit(this.combinedFoodCart);
  }
}
