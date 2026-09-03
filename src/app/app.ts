import { Component, inject, input } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';
import { ProductState } from './modules/products';
import { RouterOutlet, RouterLink } from '@angular/router';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import data from "./data.json";
import categories from "./category.json";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./styles/app.css'],
})
export class App {
 
  private localStorageService = inject(LocalStorageService)
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
//    if (!this.loadData()) {
      this.saveData(data);
      console.log(data)
    // } else {
    //   console.log("Already exists!")
    // }
  }
  saveData(data: any): void {
    this.localStorageService.setItem('demoData', data);
  }
  loadData(): ProductState {
    return this.localStorageService.getItem('demoData');
  }
  title = 'My new warehouse';
}
