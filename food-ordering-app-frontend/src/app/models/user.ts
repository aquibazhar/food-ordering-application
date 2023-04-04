export class User {
  constructor(
    public fullName: string,
    public mobileNumber: string,
    public email: string,
    public username: string,
    public password: string,
    public role: string,
    public id: number
  ) {}
}
