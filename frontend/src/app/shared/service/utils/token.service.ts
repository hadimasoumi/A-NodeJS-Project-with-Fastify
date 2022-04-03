import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  public getTokenData(token) {
    return jwtDecode(token);
  }

  public getTokenExpirationDate(token) {
    const deCode = jwtDecode(token);
    // fixme why 1000? check
    return new Date(deCode['exp'] * 1000);
  }
}
