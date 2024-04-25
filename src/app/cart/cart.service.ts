import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = environment.apiUrl + "/cart";
  private apiCheckoutUrl = environment.apiUrl + "/checkout";

  constructor(private http : HttpClient) { }

  addToCart(product : Product) : Observable<Product>{
    return this.http.post<Product>(this.apiUrl , product);
  }


  getCartItems() : Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl)
  }

  clearCart() : Observable<void>{
    return this.http.delete<void>(this.apiUrl)
  }

  checkoutItems(items : Product[]) : Observable<void>{
    return this.http.post<void>(this.apiCheckoutUrl, items)
  }



}
