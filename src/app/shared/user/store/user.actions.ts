export class LoginUser {
  static readonly type = '[User] Login';
  constructor(public externalId: string, public firstName: string, public lastName: string) {}
}

export class AvailableClassesFetchRequest {
  static readonly type = '[User] Available Classes Fetch Request';
  constructor(public externalUserId: string) {}
}

export class SelectClass {
  static readonly type = '[User] Select Class';
  constructor(public selectedClass: string) {}
}
