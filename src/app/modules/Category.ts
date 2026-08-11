import { Component } from "@angular/core";
export interface category {
    name: string,
    id: number,
    desc: string,

}
@Component({
    standalone: true,
    selector: "category",
    template: `
  Just some Categories!
    `,
})
export class Category{
    // Products: Product = {
    //     "id_sp": 1343234,
    //     "ten_sp": "",
    //     "danh_muc": "",
    //     "don_vi_tinh": "",
    //     "gia_nhap": 1234,
    //     "gia_ban": 1233,
    //     "so_luong_ton": 12,
    //     "muc_ton_toi_thieu": 3,
    //     "trang_thai": true
    // }
}