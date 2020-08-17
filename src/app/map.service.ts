import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private httpClient: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken
  }

  async getVehicleData(): Promise<any> {
    const data = await this.httpClient.get('http://localhost:3001/data').toPromise();
    return data;
  }
}