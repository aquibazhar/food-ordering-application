export class OrderItem {
  constructor(
    public id: number,
    public foodItemId: number,
    public quantity: number,
    public restaurantId: number
  ) {}
}
