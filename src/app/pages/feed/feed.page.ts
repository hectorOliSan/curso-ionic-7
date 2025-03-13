import { Component, OnInit } from '@angular/core';

interface Painting {
  date: Date;
  author: string;
  title: string;
  image: string;
}

const PAINTINGS: Painting[] = [
  {
    date: new Date(),
    author: 'Vincent van Gogh',
    title: 'La noche estrellada',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  },
  {
    date: new Date(),
    author: 'Claude Monet',
    title: 'Impresión, sol naciente',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1280px-Monet_-_Impression%2C_Sunrise.jpg',
  },
  {
    date: new Date(),
    author: 'Diego Velázquez',
    title: 'Las meninas',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Las_Meninas_01.jpg/800px-Las_Meninas_01.jpg',
  },
];

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  paintings: Painting[] = [];

  addPaintings(qty: number) {
    for (let i = 0; i < qty; i++) {
      const randomId = Math.floor(PAINTINGS.length * Math.random());
      const item = { ...PAINTINGS[randomId] };
      this.paintings.unshift(item);
    }
  }

  handleRefresh(refreshEvent: any) {
    setTimeout(() => {
      this.addPaintings(1);
      refreshEvent.target.complete();
    }, 500);
  }

  constructor() {}

  ngOnInit() {
    this.addPaintings(2);
  }
}
