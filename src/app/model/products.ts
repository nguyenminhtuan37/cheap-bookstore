import { Component } from "@angular/core";
import data from '../data.json';
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
@Component({
    selector: "product",
    
    template: `
      <div class="product-container">
        <div class="text_sp"> {{ ten_sp }} </div>
        <div class="text_sp"> {{ danh_muc }} </div>
        <div class="text_sp"> {{ don_vi_tinh }} </div>
        <div class="text_sp"> {{ gia_nhap }} </div>
        <div class="text_sp"> {{ gia_ban }} </div>
        <div class="text_sp"> {{ so_luong_ton }} </div>
        <div class="text_sp"> {{ muc_ton_toi_thieu }} </div>
        <div class="text_sp"> {{ trang_thai }} </div>
      </div>
    `
})
export class Product {
   
}


