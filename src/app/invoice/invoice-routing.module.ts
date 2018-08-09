import { InvoiceviewComponent } from './invoiceview/invoiceview.component';
import { InvoiceComponent } from './invoice.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'invoice', component: InvoiceComponent },
  { path: ':id', component: InvoiceviewComponent },
  { path: '', component: InvoiceComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
