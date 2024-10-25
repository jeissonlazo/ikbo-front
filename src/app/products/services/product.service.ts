import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  expiration_date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:5000/products/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Get a single product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}${id}`);
  }

  // Create a new product
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, this.httpOptions);
  }

  // Update a product
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}${id}`, product, this.httpOptions);
  }

  // Delete a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`, this.httpOptions);
  }

  // Search products by name
  searchProduct(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}search?q=${term}`);
  }

  updateInventory(productId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${productId}`, data);
  }
}