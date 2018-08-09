import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { InvoiceService } from '../services/invoice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {
  form: FormGroup;

  customerctrl = new FormControl();
  filteredCustomers: Observable<any[]>;
  invoice_products = new Array();
  displayedColumns: string[] = ['product_description', 'hsn_code', 'quantity', 'rate',
    'amount', 'taxable_value', 'cgst_amount', 'sgst_amount', 'total'];

  dataSource = new MatTableDataSource<any>();
  customers: any;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public invoiceService: InvoiceService,
    private changeDetectorRefs: ChangeDetectorRef,
    private toastr: ToastrService) {

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      customer_id: '', invoice_no: '', state: '', invoice_code: '', dc_no: '', invoice_date: '',
      transport_mode: '', vehicle_no: '', date_of_supply: '', reverse_charge: '',
      place_of_supply: '', po_no: '', po_date: '',
    });


    this.invoiceService.getAllCustomers().subscribe(result => {
      this.customers = result;
      this.filteredCustomers = this.customerctrl.valueChanges
        .pipe(startWith(''), map(customer => customer ? this._filterCustomers(customer) : this.customers.slice())
        );
    });
  }

  private _filterCustomers(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(customer => customer.name.toLowerCase().indexOf(filterValue) === 0);
  }
  openAddProductsDialog(): void {
    const dialogRef = this.dialog.open(ProductsDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const CGSTAmount = ((result.value.quantity * result.value.rate) * 2.5) / 100;
      const SGSTAmount = ((result.value.quantity * result.value.rate) * 2.5) / 100;
      this.invoice_products.push({
        'product_description': result.value.product_description,
        'hsn_code': result.value.hsn_code,
        'quantity': result.value.quantity,
        'rate': result.value.rate,
        'cgst_amount': CGSTAmount,
        'sgst_amount': SGSTAmount,
        'total': (result.value.quantity * result.value.rate) + CGSTAmount + SGSTAmount
      });
      this.dataSource.data = this.invoice_products;
    });

  }
  getTotalCost() {
    return this.invoice_products.map(t => t.rate * t.quantity).reduce((acc, value) => acc + value, 0);
  }

  getTotalTaxableValue() {
    return this.invoice_products.map(t => t.rate * t.quantity).reduce((acc, value) => acc + value, 0);
  }

  getTotalCGSTAmount() {
    return this.invoice_products.map(t => t.cgst_amount).reduce((acc, value) => acc + value, 0);
  }

  getTotalSGSTAmount() {
    return this.invoice_products.map(t => t.sgst_amount).reduce((acc, value) => acc + value, 0);
  }

  getTotal() {
    return this.invoice_products.map(t => t.total).reduce((acc, value) => acc + value, 0);

  }

  refresh() {
    this.changeDetectorRefs.detectChanges();
  }


  submit(form) {
    const invoiceInformation = form.value;
    invoiceInformation.invoice_products = this.invoice_products;
    console.log('sdfsdfsdf', invoiceInformation);
    this.invoiceService.createInvoice(invoiceInformation).subscribe(result => {
      this.toastr.success('Customer Created.', 'Success!', {
        closeButton: true,
      });
      this.form.reset();
      this.invoice_products = [];
    });
  }

}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'products-dialog.component.html',
})
export class ProductsDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductsDialogComponent>) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      product_description: '',
      hsn_code: '', quantity: '', rate: ''
    });
  }
  submit(form) {
    this.dialogRef.close(form);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
