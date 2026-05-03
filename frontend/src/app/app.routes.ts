import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'collection/:id', component: CollectionDetailComponent },
  { path: '**', redirectTo: '' }
];
