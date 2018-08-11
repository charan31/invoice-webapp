import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { switchMap, map } from 'rxjs/operators';
@Injectable()
export class InvoiceService {

  private errorMessage: string;
  private readonly rootPath = 'http://192.168.99.100:5502';
  private _postCustomer;
  private _getCustomer;
  private _postInvoice;
  private _getInvoiceById;
  constructor(
    private _httpClient: HttpClient) {
    this._postCustomer = `${this.rootPath}` + '/customer/';
    this._getCustomer = `${this.rootPath}` + '/customer/';
    this._postInvoice = `${this.rootPath}` + '/invoice/';
    this._getInvoiceById = `${this.rootPath}` + '/getinvoicebyid/';
  }
  public createCustomer(payload: any) {
    return this._httpClient.post(this._postCustomer, payload)
      .pipe(map(data => {
        return data;
      }));
  }


  public getAllCustomers() {
    return this._httpClient.get(this._getCustomer)
      .pipe(map(data => {
        return data;
      }));
  }

  public createInvoice(payload: any) {
    return this._httpClient.post(this._postInvoice, payload)
      .pipe(map(data => {
        return data;
      }));
  }

  public getInvoiceDetailsById(id: any) {
    return this._httpClient.get(this._getInvoiceById)
      .pipe(map(data => {
        return data;
      }));
  }

}
