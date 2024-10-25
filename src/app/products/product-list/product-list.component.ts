import { Component } from '@angular/core';
import { ProductService, Product } from '../services/product.service';
import { MatCardModule} from '@angular/material/card';
import { MatChipsModule} from '@angular/material/chips';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, DatePipe, CurrencyPipe, MatButtonModule, RouterModule, ReactiveFormsModule, MatFormFieldModule, MatSlideToggleModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatSnackBarModule,MatInputModule,FormsModule ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: any[] = [];
  filteredProducts: Product[] = [];
  filterForm: FormGroup;
  isDateFilterEnabled: boolean = false;
  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      searchTerm: [''],
      dateFilter: [true],
      expiration_date: ['']
    });

  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts= [...this.products];
    });
  }

  toggleDateFilter() {
    if(this.isDateFilterEnabled) {
      const today = new Date();
      const validProducts = this.products.filter(product => {
        const expirationDate = new Date(product.expiration_date);
        return expirationDate >= today;
      });
      this.filteredProducts = validProducts;
    }else{
      this.filteredProducts = this.products;
    }
  }
}
