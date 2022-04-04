import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CustomStorageService {
  constructor() {}

  public getStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  public setStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
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
