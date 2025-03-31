import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ModalController, ViewDidEnter } from '@ionic/angular';

import { environment } from 'src/environments/environment';

import { PostModel } from 'src/app/models/post.model';
import { Router } from '@angular/router';
import { PostsFacade } from 'src/app/facades/posts.facade';
import { PostModalComponent } from 'src/app/components/post-modal/post-modal.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, ViewDidEnter {
  posts: PostModel[] = [];

  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;

  gmap!: GoogleMap;
  markers: any[] = [];

  constructor(
    private router: Router,
    private postsFacade: PostsFacade,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    this.gmap = await GoogleMap.create({
      id: 'map',
      element: this.mapRef.nativeElement,
      apiKey: environment.googleMaps.apiKey,
      config: {
        center: {
          lat: 28.1222,
          lng: -15.43327,
        },
        zoom: 11,
      },
    });
    this.loadMarkers();
  }

  async loadMarkers() {
    this.postsFacade.query().subscribe((posts) => {
      this.posts = posts;
      this.posts.map(async (post) => {
        await this.addMarker(
          post.id!,
          post.title,
          post.lat,
          post.lng
        );
      });
    });
  }

  async addMarker(postId: string, title: string, lat: number, lng: number) {
    const mark = {
      id: '',
      coordinate: {
        lat,
        lng,
      },
      title,
      postId,
    };
    mark.id = await this.gmap.addMarker(mark);
    this.gmap.setOnMarkerClickListener(async (data) => {
      console.log('Marker clicked', data);
      
      const modal = await this.modalCtrl.create({
        component: PostModalComponent,
        componentProps: {
          modalData: {
            postId: mark.postId,
          },
        },
        backdropDismiss: true,
      });
      await modal.present();
    });
    this.markers.push(mark);
  }

  createPost() {
    this.router.navigate(['post']);
  }
}
