export class User {
  constructor(
    public email: string,
    public id: string,
    public _token: string | boolean | number,
    public _tokenExpirationDate: Date
  ) {}

  get token() {
    return this._token;
  }
}
