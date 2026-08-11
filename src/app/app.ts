import { Component, inject } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';
import data from "./data.json";
import {RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  private prods: string[] = []
  private localStorageService = inject(LocalStorageService)

  ngOnInit(): void {
    console.log("it ran!")
    console.log(data);
    this.saveData();
  }
  saveData(): void {
    this.localStorageService.setItem('demoData', data);
  }
  loadData(): void {
    this.localStorageService.getItem('demoData');
    alert('data loaded!');
  }
  title = 'My new warehouse';
}
// @Component({
//   selector: 'app-home',
//   imports: [RouterOutlet, RouterLink],
//   template: `
//     <div id="navbar">
//           <div class="nav-opt"><a [routerLink]="/product">Products</a></div>
//           <div class="nav-opt"><a [routerLink]="/category">Categories</a></div>
//           <div class="nav-opt"><a>Nhập/Xuất</a></div>
//           <div class="nav-opt"></div>
//     </div>
//   `,
//   styleUrls: [],
// })
// export class Home{
//   product: any = {};
// }