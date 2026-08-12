import { Component, inject } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';
import data from "./data.json";
import { RouterOutlet, RouterLink } from '@angular/router';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

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
  private route = inject(ActivatedRoute);

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
