import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsPage } from './contacts.page';
import { ContactsPageRoutingModule } from './contacts-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsPageRoutingModule,
  ],
  declarations: [ContactsPage]
})
export class ContactsPageModule {}
