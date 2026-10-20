import { Service, signal, effect } from "@angular/core";
import { ProductState } from "../../shared/models/product.model";

@Service({})
export class DataSync {
  state = signal<ProductState>({Products: JSON.parse(localStorage.getItem('productsList')!)});

  syncStorage = effect(() => {
    localStorage.setItem('productsList', JSON.stringify(this.state().Products));
  });
}
