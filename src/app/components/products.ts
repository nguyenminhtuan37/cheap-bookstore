import { Component, inject, signal } from "@angular/core";
import { DataSync } from "../service/updateData.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ChinhSuaSp } from "./PhieuChinhSua";
import { CurrencyByChoice } from "../pipes/currency.pipe";


export interface ProductInfo {
    id_sp: number,
    ten_sp: string,
    danh_muc: string,
    don_vi_tinh: string,
    gia_nhap: number,
    gia_ban: number,
    so_luong_ton: number,
    muc_ton_toi_thieu: number,
    trang_thai: boolean,
}
export interface ProductState {
  Products: ProductInfo[] | null,
}
@Component({
    selector: "product",
    styleUrls: ['../styles/app.css', '../styles/display.css'],
    templateUrl: "../models/products.html",
    imports: [ChinhSuaSp, CurrencyByChoice]
})
export class Product  {
  dataSync = inject(DataSync);
  route = inject(ActivatedRoute);
  router = inject(Router);
  
  // readonly!
  ProductsView = this.dataSync.state().Products ?? [];
  // whats next?
    DeleteProduct(id: number) {
    const items = this.dataSync.state().Products ?? [];
    this.dataSync.state.set(
      {Products: items.filter((item) => item.id_sp !== id)}
    )
  }
  EditProduct(id: number) {
    
  }
}

      
