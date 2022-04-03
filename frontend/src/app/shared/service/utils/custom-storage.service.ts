import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomStorageService {
  constructor() {}

  public getStorage(key: string) {
    if (false) {
      if (localStorage.getItem(key)) {
        return JSON.parse(
          Base64.decode(
            localStorage
              .getItem(key)
              .split('')
              .reverse()
              .join('')
          )
            .split('')
            .reverse()
            .join('')
        );
      }
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  public setStorage(key: string, value: any) {
    if (false) {
      localStorage.setItem(
        key,
        Base64.encode(
          JSON.stringify(value)
            .split('')
            .reverse()
            .join('')
        )
          .split('')
          .reverse()
          .join('')
      );
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  public getCache(key: string) {
    const data = this.getStorage(key);

    if (!data || !data.timestamp || new Date() > new Date(data.timestamp)) {
      return null;
    } else {
      return data.value;
    }
  }

  public setCache(key: string, value: any) {
    const today = new Date();
    today.setHours(today.getHours() + 1);
    this.setStorage(key, { value, timestamp: today });
  }

  public clearCache(key: string) {
    localStorage.removeItem(key);
  }
}
