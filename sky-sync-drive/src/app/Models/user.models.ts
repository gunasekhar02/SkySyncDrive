// user.models.ts

export class UserLogin {
  constructor(
    public email: string,
    public password: string
  ) {}
}

export class UserSignin {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string
  ) {}
}