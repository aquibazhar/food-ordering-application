import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { FoodItem } from 'src/app/models/food-item';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css'],
})
export class MenuCategoryComponent implements OnChanges {
  @Input() category: string = 'initial';
  @Output() cartChanged: EventEmitter<string> = new EventEmitter<string>();
  dataFetched: boolean = false;
  foodItems: FoodItem[] = [];
  parentComponent: string = 'order';

  constructor(private foodService: FoodService) {
    this.getMenuItemsByCategory();
    // console.log(this.category);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes[0].currentValue);
    for (const change in changes) {
      this.category = changes[change].currentValue;
    }
    this.getMenuItemsByCategory();
  }

  getMenuItemsByCategory() {
    this.foodService.getFoodByCuisineType(this.category).subscribe((data) => {
      this.foodItems = data;
      this.dataFetched = true;
    });
  }

  onCartChange() {
    this.cartChanged.emit('added');
  }
}
