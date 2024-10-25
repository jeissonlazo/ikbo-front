import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { DatePipe, CurrencyPipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, DatePipe, CurrencyPipe, MatButtonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}
