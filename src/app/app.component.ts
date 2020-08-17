import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // mapa: Mapboxgl.Map;

  ngOnInit() {
    // Mapboxgl.accessToken = environment.mapboxKey
    // this.mapa = new Mapboxgl.Map({
    //   container: 'mapa-mapbox',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [9.7475141, 53.5679459], // LNG LAT
    //   zoom: 9
    // });
  }
}
