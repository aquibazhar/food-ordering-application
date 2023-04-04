import { RestaurantAddress } from './restaurant-address';

export class Restaurant {
  constructor(
    public id: number,
    public name: string,
    public mobileNumber: string,
    public description: string,
    public userEmail: string,
    public openedAt: string,
    public closedAt: string,
    public address: RestaurantAddress,
    public approvalStatus: boolean,
    public image: string
  ) {}
}
