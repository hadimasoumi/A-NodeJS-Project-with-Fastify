import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

interface Location {
  latitude: string;
  longitude: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleMAPService {
  constructor(private httpService: HttpService, private http: HttpClient) {}

  getLocation() {
    // return this.httpService.requestCreator(
    //   'get',
    //   undefined,
    //   'http://api.ipapi.com/api/check?access_key=b5f65b0aed923ab2a0b0011ea83d9069'
    // );

    return this.http.get<Location>(
      'http://api.ipapi.com/api/check?access_key=b5f65b0aed923ab2a0b0011ea83d9069'
    );
  }
}
