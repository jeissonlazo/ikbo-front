import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { InventoryEntriesComponent } from './products/inventory-entries/inventory-entries.component';
import { ProductSearchComponent } from './products/product-search/product-search.component';
export const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', component: ProductListComponent },
  { path: 'crear-producto', component: ProductFormComponent },
  { path: 'entradas-salidas/:id', component: InventoryEntriesComponent },
  { path: 'buscar-producto', component: ProductSearchComponent }
];
