import { CustomerComponent } from './customer.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './customer-routing.module';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceService } from '../services/invoice.service';

import { ToastrModule } from 'ngx-toastr';
@NgModule({
  imports: [
    routing,
    MatButtonModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-center' }),
    MatInputModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [
    CustomerComponent
  ],
  providers: [InvoiceService]
})

export class CustomerModule { }
