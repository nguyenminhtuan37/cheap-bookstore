import { Service, signal, effect } from "@angular/core";
import { ProductInfo, ProductState } from "../modules/products";

@Service({})
export class DataSync {
  state = signal<ProductState>({Products: JSON.parse(localStorage.getItem('demoData')!)});

  syncStorage = effect(() => {
    localStorage.setItem('demoData', JSON.stringify(this.state()));
  });
}
