import { Component, inject, input } from '@angular/core';
import { LocalStorageService } from './shared/services/local-storage.service';
import { ProductState } from './shared/models/product.model';
import { RouterOutlet, RouterLink } from '@angular/router';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import productsList from "./shared/data/data.json";
import categoriesData from "./shared/data/category.json";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./shared/styles/app.css'],
})
export class App {
 
  private localStorageService = inject(LocalStorageService)
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    if (!this.loadData('productsList')) {
      this.saveData('productsList', productsList);
    }
    if (!this.loadData('categoriesData')) {
      this.saveData('categoriesData', categoriesData)
    }
  }
  saveData(key: string, data: any): void {
    this.localStorageService.setItem(key, data);
  }
  loadData(key: string): ProductState {
    return this.localStorageService.getItem(key);
  }
  title = 'My new warehouse';
}
