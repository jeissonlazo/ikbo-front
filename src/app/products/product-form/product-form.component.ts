import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Product, ProductService } from '../services/product.service';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar, 
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      expiration_date: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      console.log('Product saved:', product);

      this.productService.createProduct(this.productForm.value).subscribe(
        response => {
          this.snackBar.open('Product saved successfully!', 'Close', {
            duration: 3000,
          });
        },
        error => console.error('Error al crear el producto:', error)
      );
      this.productForm.reset();
    } else {
      this.snackBar.open('Please fill all required fields correctly', 'Close', {
        duration: 3000,
      });
    }
  }


  hasError(controlName: string, errorName: string): boolean {
    return this.productForm.get(controlName)?.hasError(errorName) || false;
  }
}
