// header.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
})
export class HeaderComponent {
  navLinks = [
    { path: '/productos', label: 'Products List', icon: 'inventory_2' },
    { path: '/crear-producto', label: 'Add Product', icon: 'add_box' },
    { path: '/entradas-salidas', label: 'Inventory Movements', icon: 'sync_alt' },
    { path: '/buscar-producto', label: 'Search Products', icon: 'search' }
  ];

  constructor(public router: Router) {}

  isActive(path: string): boolean {
    return this.router.isActive(path, {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }
}