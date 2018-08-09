import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InvoiceService } from '../services/invoice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public invoiceService: InvoiceService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
      state: '', gst_no: '', address: ''
    });
  }
  submit(form) {
    this.invoiceService.createCustomer(form.value).subscribe(result => {
      this.toastr.success('Customer Created.', 'Success!', {
        closeButton: true,
      });
      this.form.reset();
    });
  }
}
