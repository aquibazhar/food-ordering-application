export class UserAddress {
  constructor(
    public id: number,
    public email: string,
    public city: string,
    public state: string,
    public pincode: number,
    public houseNumber: string,
    public locality: string
  ) {}

  // private long id;
  // @NotBlank(message = "user not found")
  // private String email;
  // @NotBlank(message = "city name can not be empty")
  // private String city;
  // @NotBlank(message = "state name can not be empty")
  // private String state;
  // @NotNull(message = "pincode can not be empty")
  // private int pincode;
  // @NotBlank(message = "house number can not be empty")
  // private String houseNumber;
  // @NotBlank(message = "locality can not be empty")
  // private String locality;
}
