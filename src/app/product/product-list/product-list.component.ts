import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  filteredProducts : Product[] = [];
  sortOrder : string = '';


  constructor( private productService : ProductService, private cartService : CartService, private snackbar : MatSnackBar){

  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    })
  }

  addToCart(product : Product){
    this.cartService.addToCart(product).subscribe(
      {next : () => {
        this.snackbar.open("Product Added to Cart!", "", {
          duration : 2000,
          horizontalPosition : 'right',
          verticalPosition : 'top'
        })
      }}
    );
  }

  applyFilter(event : Event) : void{
    let searchterm = (event.target as HTMLInputElement).value;
    searchterm = searchterm.toLowerCase();

    this.filteredProducts = this.products.filter((data => data.name.toLowerCase().includes(searchterm)));
    this.sortProducts(this.sortOrder);
  }

  sortProducts(sortValue : string){
    this.sortOrder = sortValue;

    if(this.sortOrder === 'priceLowHigh'){
      this.filteredProducts.sort((a,b) => a.price-b.price)
    }else if(this.sortOrder === 'priceHighLow'){
      this.filteredProducts.sort((a,b) => b.price-a.price)
    }
  }



}
