import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'map',
        loadChildren: () =>
          import('../pages/map/map.module').then((m) => m.MapPageModule),
      },
      {
        path: 'feed',
        loadChildren: () =>
          import('../pages/feed/feed.module').then((m) => m.FeedPageModule),
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('../pages/contacts/contacts.module').then(
            (m) => m.ContactsPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../pages/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/map',
        pathMatch: 'full',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
