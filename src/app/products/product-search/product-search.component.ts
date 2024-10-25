import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {
  query: string = '';
  results: any[] = [];

  constructor(private productService: ProductService) {}

  searchProduct() {
    this.productService.searchProduct(this.query).subscribe(data => {
      this.results = data;
    });
  }
}
