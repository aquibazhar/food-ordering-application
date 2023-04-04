import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const L: any;

@Component({
  selector: 'app-add-restaurant-form-one',
  templateUrl: './add-restaurant-form-one.component.html',
  styleUrls: ['./add-restaurant-form-one.component.css'],
})
export class AddRestaurantFormOneComponent implements OnInit {
  @Output() formValid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() formGroupOne: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() formGroupTwo: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  longitude: number = 0;
  latitude: number = 0;

  otpInputOne: string = '';
  otpInputTwo: string = '';
  otpInputThree: string = '';
  otpInputFour: string = '';

  addressForm: FormGroup;
  contactDetailsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      name: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      locality: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{6}$/),
          Validators.minLength(6),
        ],
      ],
      latitude: [0, [Validators.required]],
      longitude: [0, [Validators.required]],
    });

    this.contactDetailsForm = this.fb.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^(0|91)?[6-9][0-9]{9}$/)],
      ],
    });
  }

  ngOnInit(): void {}

  detectLocation() {
    if (!navigator.geolocation) {
      console.log('Not Supported');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;
      this.addressForm.value.longitude = this.longitude;
      this.addressForm.value.latitude = this.latitude;

      this.showMap(this.latitude, this.longitude);
    });
  }

  showMap(latitude: number, longitude: number) {
    let map = L.map('map').setView([51.5, -0.09], 14);

    let marker = L.marker([51.5, -0.09], { draggable: true }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    marker.on('dragend', (event: any) => {
      const marker = event.target;
      const position = marker.getLatLng();
      this.latitude = position.lat;
      this.longitude = position.lng;
      this.addressForm.value.longitude = this.longitude;
      this.addressForm.value.latitude = this.latitude;
    });
  }

  onSubmit() {
    console.log(this.addressForm.value);
    console.log(this.contactDetailsForm.value);
    console.log(this.addressForm.valid);
    this.formValid.emit(this.addressForm.valid);
    this.formGroupOne.emit(this.addressForm);
    this.formGroupTwo.emit(this.contactDetailsForm);
  }

  onKeyUp(event: any, previous: any, current: any, next: any) {
    let length = current.value.length;
    let maxLength = current.getAttribute('maxLength');
    if (!(event.key <= 9 && event.key >= 0)) {
      if (event.key === 'Backspace') {
        if (previous !== '') {
          previous.focus();
        }
      }
      current.value = '';
      return;
    }
    if (length == maxLength) {
      if (next !== '') {
        next.focus();
      }
    }
  }
}
