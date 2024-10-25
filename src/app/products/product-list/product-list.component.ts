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
  isDateFilterEnabled: boolean = true;
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
    });
  }

  toggleDateFilter() {
    console.log('Date filter toggled', this.isDateFilterEnabled);
    if(this.isDateFilterEnabled) {
      this.filteredProducts = this.products.filter(product => new Date(product.expiration_date) <= new Date());
    }else{
      this.filteredProducts = this.products;
    }
  }

  applyFilters() {
    let filtered = [...this.products];
    const searchTerm = this.filterForm.get('searchTerm')?.value.toLowerCase();
    const expirationDate = this.filterForm.get('expiration_date')?.value;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply date filter if enabled
    if (this.isDateFilterEnabled && expirationDate) {
      filtered = filtered.filter(product =>
        new Date(product.expiration_date) <= new Date(expirationDate)
      );
    }

    this.filteredProducts = filtered;
  }
}
