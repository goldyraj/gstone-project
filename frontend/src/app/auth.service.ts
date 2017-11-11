import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  isLogedIn:boolean=false;
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
