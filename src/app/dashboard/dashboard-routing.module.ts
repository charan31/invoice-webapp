import { DashboardComponent } from './dashboard.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: DashboardComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);