import { Component, inject, input } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';
import { ProductState } from './components/products';
import { RouterOutlet, RouterLink } from '@angular/router';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import data from "./data.json";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './models/app.html',
  styleUrls: ['./styles/app.css'],
})
export class App {
 
  private localStorageService = inject(LocalStorageService)
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
//    if (!this.loadData()) {
      this.saveData(data);

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
