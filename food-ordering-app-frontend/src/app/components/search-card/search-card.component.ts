import { Component, Input } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css'],
})
export class SearchCardComponent {
  @Input() restaurants: Restaurant[] = [];
}
