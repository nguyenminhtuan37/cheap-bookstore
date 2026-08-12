import { Component, inject, signal } from "@angular/core";
import { LocalStorageService } from "../service/local-storage.service";
import { DataSync } from "../service/updateData.service";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
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
  Products: Product[] | null,
}
@Component({
    selector: "product",
    styleUrls: ['../app.css'],
    template: `
    <div id="table-legend">
      <span class="column-name">Tên sản phẩm</span>
      <span class="column-name">Danh mục</span>
      <span class="column-name">Đơn vị tính</span>
      <span class="column-name">Giá nhập</span>
      <span class="column-name">Giá bán</span>
      <span class="column-name">Số lượng tồn</span>
      <span class="column-name">Mức tồn tối thiểu</span>
      <span class="column-name">Trạng thái</span>
    </div>
      @for (item of items; track items) {
        <div class="product-container">
          <span class="text_sp"> {{ item.ten_sp }} </span>
          <div class="text_sp"> {{ item.danh_muc }} </div>
          <div class="text_sp"> {{ item.don_vi_tinh }} </div>
          <div class="text_sp"> {{ item.gia_nhap }} </div>
          <div class="text_sp"> {{ item.gia_ban }} </div>
          <div class="text_sp"> {{ item.so_luong_ton }} </div>
          <div class="text_sp"> {{ item.muc_ton_toi_thieu }} </div>
          <div class="text_sp"> {{ item.trang_thai }} </div>
          <div class="ActionButton">Edit</div>
          <div class="ActionButton" (click)="DestroyProduct($event)">Delete</div>
        </div>
      }
    `,
    imports: []
})
export class Product {
  private dataSync = inject(DataSync);
  private localStorageService = inject(LocalStorageService);  
  
}

      
