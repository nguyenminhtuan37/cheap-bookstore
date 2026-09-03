import { Service, signal, computed } from "@angular/core";
import { ProductInfo, ProductState } from "../modules/products";

@Service({})
export class DataSync {
  state = signal<ProductState>({Products: JSON.parse(localStorage.getItem('demoData')!)});

  syncStorage = computed(() => {
    localStorage.setItem('demoData', JSON.stringify(this.state()));
  });
}
