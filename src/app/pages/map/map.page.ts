import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ViewDidEnter } from '@ionic/angular';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, ViewDidEnter {
  @ViewChild('mapa', { static: false })
  mapaRef!: ElementRef<HTMLElement>;

  gmap!: GoogleMap;
  marcadores: any[] = [];

  constructor() {}

  ngOnInit() {
    console.log(environment.googleMaps.APIKey);
  }

  async ionViewDidEnter() {
    this.gmap = await GoogleMap.create({
      id: 'map',
      element: this.mapaRef.nativeElement,
      apiKey: environment.googleMaps.APIKey,
      config: {
        center: {
          lat: 28.1222,
          lng: -15.43327,
        },
        zoom: 11,
      },
    });
  }

  async addMarker(titulo: string, lat: number, lng: number) {
    const marcador = {
      id: '',
      coordinate: {
        lat,
        lng,
      },
      titulo,
    };
    marcador.id = await this.gmap.addMarker(marcador);
    this.marcadores.push(marcador);
  }
}
