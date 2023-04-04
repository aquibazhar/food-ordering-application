import { Component, EventEmitter, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FoodItemImage } from 'src/app/models/food-item-image';

@Component({
  selector: 'app-add-restaurant-form-two',
  templateUrl: './add-restaurant-form-two.component.html',
  styleUrls: ['./add-restaurant-form-two.component.css'],
})
export class AddRestaurantFormTwoComponent {
  opensAt: string = '';

  restaurantImage: string;

  cuisineTypes: string[] = [
    'Afghan',
    'African',
    'American',
    'Andhra',
    'Arabian',
    'Asian',
    'Asian Fusion',
    'Australian',
    'Awadhi',
    'Bakery',
    'Bangladeshi',
    'Bar Food',
    'BBQ',
    'Belgian',
    'Bengali',
    'Beverages',
    'Bihari',
    'Biryani',
    'Brazilian',
    'British',
    'Bubble Tea',
    'Burger',
    'Cafe',
    'Cafe Food',
    'Cake',
    'Charcoal Chicken',
    'Chettinad',
    'Chili',
    'Chinese',
    'Coffee',
    'Coffee and Tea',
    'Continental',
    'Desserts',
    'Drinks Only',
    'European',
    'Fast Food',
    'Finger Food',
    'French',
    'Fried Chicken',
    'Frozen Yogurt',
    'Fusion',
    'Garhwali',
    'German',
    'Goan',
    'Greek',
    'Grill',
    'Gujarati',
    'Healthy Food',
    'Himachali',
    'Hot dogs',
    'Hyderabadi',
    'Ice Cream',
    'Indian',
    'Indonesian',
    'Italian',
    'Japanese',
    'Juices',
    'Kashmiri',
    'Kebab',
    'Kerala',
    'Korean',
    'Lebanese',
    'Lucknowi',
    'Maharashtrian',
    'Mangalorean',
    'Mediterranean',
    'Mexican',
    'Mithai',
    'Modern Indian',
    'Momos',
    'Mongolian',
    'Moroccan',
    'Mughlai',
    'Nepalese',
    'North Eastern',
    'North Indian',
    'Pakistani',
    'Pizza',
    'Portuguese',
    'Rajasthani',
    'Raw Meats',
    'Roast Chicken',
    'Rolls',
    'Russian',
    'Salad',
    'Sandwich',
    'Seafood',
    'Sindhi',
    'Singaporean',
    'South American',
    'South Indian',
    'Spanish',
    'Sri Lankan',
    'Steak',
    'Street Food',
    'Sushi',
    'Tamil',
    'Tea',
    'Thai',

    'Wraps',
  ];

  times: string[] = [
    '12:00 AM',
    '12:15 AM',
    '12:30 AM',
    '12:45 AM',
    '01:00 AM',
    '01:15 AM',
    '01:30 AM',
    '01:45 AM',
    '02:00 AM',
    '02:15 AM',
    '02:30 AM',
    '02:45 AM',
    '03:00 AM',
    '03:15 AM',
    '03:30 AM',
    '03:45 AM',
    '04:00 AM',
    '04:15 AM',
    '04:30 AM',
    '04:45 AM',
    '05:00 AM',
    '05:15 AM',
    '05:30 AM',
    '05:45 AM',
    '06:00 AM',
    '06:15 AM',
    '06:30 AM',
    '06:45 AM',
    '07:00 AM',
    '07:15 AM',
    '07:30 AM',
    '07:45 AM',
    '08:00 AM',
    '08:15 AM',
    '08:30 AM',
    '08:45 AM',
    '09:00 AM',
    '09:15 AM',
    '09:30 AM',
    '09:45 AM',
    '10:00 AM',
    '10:15 AM',
    '10:30 AM',
    '10:45 AM',
    '11:00 AM',
    '11:15 AM',
    '11:30 AM',
    '11:45 AM',
    '12:00 PM',
    '12:15 PM',
    '12:30 PM',
    '12:45 PM',
    '01:00 PM',
    '01:15 PM',
    '01:30 PM',
    '01:45 PM',
    '02:00 PM',
    '02:15 PM',
    '02:30 PM',
    '02:45 PM',
    '03:00 PM',
    '03:15 PM',
    '03:30 PM',
    '03:45 PM',
    '04:00 PM',
    '04:15 PM',
    '04:30 PM',
    '04:45 PM',
    '05:00 PM',
    '05:15 PM',
    '05:30 PM',
    '05:45 PM',
    '06:00 PM',
    '06:15 PM',
    '06:30 PM',
    '06:45 PM',
    '07:00 PM',
    '07:15 PM',
    '07:30 PM',
    '07:45 PM',
    '08:00 PM',
    '08:15 PM',
    '08:30 PM',
    '08:45 PM',
    '09:00 PM',
    '09:15 PM',
    '09:30 PM',
    '09:45 PM',
    '10:00 PM',
    '10:15 PM',
    '10:30 PM',
    '10:45 PM',
    '11:00 PM',
    '11:15 PM',
    '11:30 PM',
    '11:45 PM',
  ];

  timingsForm: FormGroup;
  @Output() timingFormGroup: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  selectedCuisineTypes: string[] = [];
  searchInput: string = '';
  maxSelections: number = 0;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.restaurantImage = '';
    this.timingsForm = this.fb.group({
      opensAt: ['', [Validators.required]],
      closesAt: ['', [Validators.required]],
    });
  }
  onCuisineTypeSelectionChange(cuisineType: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedCuisineTypes.push(cuisineType);
    } else {
      const index = this.selectedCuisineTypes.indexOf(cuisineType);
      if (index >= 0) {
        this.selectedCuisineTypes.splice(index, 1);
      }
    }
    this.maxSelections = this.selectedCuisineTypes.length;
    console.log(this.maxSelections);
  }

  remove(selectedCuisine: string): void {
    console.log(this.maxSelections);
    if (this.maxSelections === 5) {
      this.maxSelections = 4;
    }
    const index = this.selectedCuisineTypes.indexOf(selectedCuisine);

    if (index >= 0) {
      this.selectedCuisineTypes.splice(index, 1);
      this.maxSelections = this.selectedCuisineTypes.length;
    }
  }

  onSubmit() {
    console.log(this.selectedCuisineTypes);
    console.log(this.timingsForm.value);

    if (this.restaurantImage === '') {
      this.openSnackBar('Please select an image for the restaurant', 'OK');
      return;
    }

    if (this.selectedCuisineTypes.length > 0 && this.timingsForm.valid) {
      this.timingsForm.value.cuisineTypes = this.selectedCuisineTypes;

      this.timingsForm.value.restaurantImage = this.restaurantImage;
      this.timingFormGroup.emit(this.timingsForm);
    }
  }

  onOpensAtChange() {
    this.opensAt = this.timingsForm.value.opensAt;
  }

  onImageUpload(image: FoodItemImage) {
    this.restaurantImage = image.image;
    console.log(this.restaurantImage);
    this.openSnackBar('Image uploaded successfully', 'OK');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }
}
