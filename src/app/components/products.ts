import { Component, inject, input } from "@angular/core";
import { DataSync } from "../service/updateData.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductAction } from "../service/ProductAction";
import { CurrencyByChoice } from "../pipes/currency.pipe";
import { ChinhSuaSp } from "./PhieuChinhSua";

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
    imports: [CurrencyByChoice, ChinhSuaSp]
})
export class Product  {
  dataSync = inject(DataSync);
  route = inject(ActivatedRoute);
  router = inject(Router);
  private productAction = inject(ProductAction);
  editRequest = false;
  // readonly!
  ProductsView = this.dataSync.state().Products ?? [];
  // whats next?
  DeleteProduct(id: number): void {
    this.productAction.deleteProduct(id);
  }
  EditProduct(id: number) {
    this.productAction.selectProductForEdit(id);
    this.editRequest = true;
  }
}

      
