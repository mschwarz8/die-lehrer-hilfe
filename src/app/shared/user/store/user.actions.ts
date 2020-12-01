export class LoginUser {
  static readonly type = '[User] Login';
  constructor(public externalId: string, public firstName: string, public lastName: string) {}
}
