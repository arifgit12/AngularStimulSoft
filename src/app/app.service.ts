import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//'../assets/reports/categories.json'

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private categoriesUrl = 'assets/reports/categories.json';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(this.categoriesUrl);
  }
}
