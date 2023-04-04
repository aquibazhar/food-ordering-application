export class Cart {
  constructor(
    public id: number,
    public foodItemId: number,
    public userId: number,
    public quantity: number,
    public restaurantId: number
  ) {}
}
