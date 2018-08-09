import { InvoiceComponent, ProductsDialogComponent } from './invoice.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './invoice-routing.module';
import {
  MatButtonModule, MatSelectModule, MatInputModule,
  MatDatepickerModule, MatAutocompleteModule, MatNativeDateModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { InvoiceService } from '../services/invoice.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { InvoiceviewComponent } from './invoiceview/invoiceview.component';

@NgModule({
  imports: [CommonModule, routing, MatNativeDateModule, MatDatepickerModule,
    MatButtonModule, HttpClientModule, MatSelectModule,
    MatInputModule, MatDialogModule, MatTableModule,
    MatAutocompleteModule, FormsModule,
    ReactiveFormsModule, ToastrModule.forRoot({ positionClass: 'toast-bottom-center' })],
  declarations: [InvoiceComponent, ProductsDialogComponent, InvoiceviewComponent],
  entryComponents: [ProductsDialogComponent],

  providers: [InvoiceService]
})
export class InvoiceModule { }
