import { CustomerComponent } from './customer.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: CustomerComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);