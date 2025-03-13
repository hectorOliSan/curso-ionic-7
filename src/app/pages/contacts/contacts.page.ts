import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

interface Contact {
  avatar: string;
  name: string;
  date: Date;
}

const BASE_URL_AVATAR: string =
  'https://api.dicebear.com/9.x/identicon/svg?seed=';

const NAMES: string[] = [
  'Vincent van Gogh',
  'Claude Monet',
  'Diego Velázquez',
  'Rembrandt',
  'Caravaggio',
  'Francisco de Goya',
  'Sandro Botticelli',
  'Leonardo da Vinci',
  'Salvador Dalí',
  'Pablo Picasso',
];

const CONTACTS: Contact[] = NAMES.map((name) => ({
  date: new Date(),
  avatar: `${BASE_URL_AVATAR}${name}`,
  name,
}));

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: Contact[] = [];

  getContacts(qty: number) {
    for (let i = 0; i < qty; i++) {
      const randomId = Math.floor(CONTACTS.length * Math.random());
      const item = { ...CONTACTS[randomId] };
      this.contacts.push(item);
    }
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.getContacts(3);
    setTimeout(() => {
      event.target.complete();
    }); // Without timeout
  }

  constructor() {}

  ngOnInit() {
    this.getContacts(15);
  }
}
