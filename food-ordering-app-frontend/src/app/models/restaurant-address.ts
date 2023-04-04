export class RestaurantAddress {
  constructor(
    public id: number,
    public city: string,
    public state: string,
    public pincode: number,
    public houseNumber: string,
    public locality: string,
    public latitude: number,
    public longitude: number
  ) {}
}
