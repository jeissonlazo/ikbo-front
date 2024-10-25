import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-inventory-entries',
  imports: [FormsModule, MatCardModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatButtonToggleModule],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  templateUrl: './inventory-entries.component.html',
  styleUrl: './inventory-entries.component.scss'
})
export class InventoryEntriesComponent {
  productId: number = 0;

  updateForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.updateForm = this.fb.group({
      id: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]],
      operationType: ['add', Validators.required],
      description: ['', Validators.required],
      name: ['',Validators.required, Validators],
      expiration_date: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id']; // Access the 'id' parameter from the URL
      this.loadProduct(this.productId);
    });
  }

  updateInventory() {
    console.log('Updating inventory:', this.updateForm.value);
    this.productService.updateInventory(this.productId, this.updateForm.value)
      .subscribe(
        response => {this.snackBar.open('Product saved successfully!', 'Close', {
          duration: 3000,
        })},
        error => console.error('Error al actualizar el inventario:', error)
      );
  }

  resetForm(): void {
    this.updateForm.reset({
      operationType: 'add',
      date: new Date()
    });
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id)
    .subscribe(
      response => this.fillForm(response),
      error => console.error('Error al actualizar el inventario:', error)
    );
  }

  fillForm(product: any): void {
    this.updateForm.get('date')?.setValue(new Date(product.expiration_date));
    this.updateForm.get('id')?.setValue(product.id);
    this.updateForm.get('stock')?.setValue(product.stock);
    this.updateForm.get('description')?.setValue(product.description);
    this.updateForm.get('price')?.setValue(product.price);
    this.updateForm.get('name')?.setValue(product.name);
  }
}
