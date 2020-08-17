import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { Observable } from 'rxjs';
import { GeoJson } from '../map';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit {

  /// default settings
  map: Mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lng = 9.7475141;
  lat = 53.5679459;

  // data
  selected: any;
  vehicles: any;

  constructor(private mapService: MapService) {
    this.createMarker = this.createMarker.bind(this);
  }

  async ngOnInit() {
    await this.mapService.getVehicleData().then(data => {
      this.vehicles = data;
    }
    ).then(() => this.initializeMap())
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
        this.vehicles.forEach(vehicle => {
          this.createMarker(vehicle)
        });
      });
    }

    this.buildMap()

  }

  buildMap() {
    Mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new Mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 9,
      center: [this.lng, this.lat]
    });

    /// Add map controls
    this.map.addControl(new Mapboxgl.NavigationControl());


    //// Add Marker on Click
    this.map.on('click', (event) => {
      console.log(event);
      this.selected = this.vehicles.filter(vehicle => {
        return vehicle.geoCoordinate.longitude === event.lngLat.lng
      })
      console.log(this.selected);
      const coordinates = [event.lngLat.lng, event.lngLat.lat]
      //this.mapService.createMarker(newMarker)
    })


    /// Add realtime data on map load
    this.map.on('load', (event) => {
    })

  }


  createMarker(vehicle: any) {
    let el = document.createElement('div');
    el.id = 'marker';
    el.addEventListener('click', () => {
      alert("Marker Clicked.");
    }
    );
    let mark = new Mapboxgl.Marker()
      .setLngLat([vehicle.geoCoordinate.longitude, vehicle.geoCoordinate.latitude])
      .setPopup(new Mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(`<div">
        <h3> Address: ${vehicle.address}  (${vehicle.fuelType}) </h3>
        <p> Build: ${vehicle.buildSeries} </p>
        <p> Fuel Type : ${vehicle.fuelType}</p>
        <p> Available: ${vehicle.freeForRental ? 'Yes' : 'No'} </p>
        </div>
        `))
      .addTo(this.map)
  }



  /// Helpers

  selectVehicle(vehicle) {
    this.selected = vehicle;
  }

  flyTo(data: any) {
    this.selected = data;
    this.map.flyTo({
      zoom: 25,
      center: [data.geoCoordinate.longitude, data.geoCoordinate.latitude]
    })
  }
}