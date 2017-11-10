import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  isLogedIn:boolean;
  constructor() { }

  isLoggedIn()
  {
    return this.isLogedIn;
  }

  setLogin(isLogedIn:boolean)
  {
    this.isLogedIn=isLogedIn;
  }

}
