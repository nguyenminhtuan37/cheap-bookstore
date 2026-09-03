import { Component, inject, input, computed } from "@angular/core";
import { DataSync } from "../service/updateData.service";
import { ActivatedRoute, Router } from "@angular/router";

export interface ProductInfo {
    id_sp: number,
    ten_sp: string,
    danh_muc: string,
    don_vi_tinh: string | null,
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
    templateUrl: "../products.html",
    imports: []
})
export class Product  {
  dataSync = inject(DataSync);
  route = inject(ActivatedRoute);
  router = inject(Router);

  selectedOption = computed(() => {
    const dataView = this.dataSync.state().Products ?? [];
    
    return dataView.sort((a, b) => a.ten_sp.localeCompare(b.ten_sp))
  })

  // whats next?
  constructor () {
    this.route.queryParams.subscribe((params) => {
      const sort = params['sort'] || "price";
      const filter = params['danh_muc'] || "";
      this.LoadProducts(sort, filter);
    })
  }
  LoadProducts(sortBy: string, filter: string): void {
    // const items = this.dataSync.state().Products ?? [];
    // this.dataSync.state.set(() => {
    this.selectedOption.set(() => {
      
    })
  }
  sortTable(event: Event) {
    const sort = (event.target as HTMLSelectElement).value;
    this.router.navigate(['/products'], {
      queryParams: {sort},
      queryParamsHandling: 'merge',
    });
  }
  

  // DestroyProduct(id_sp: number) {
  //   // something...
  //   const items = this.dataSync.state().Products ?? [];
  //   this.dataSync.state.set({
  //     Products: items.filter((item) => item.id_sp !== id_sp),
  //   });
  //   window.alert(`Đã xóa sản phẩm mã ${id_sp}`)
  // }
  // EditProduct(id_sp: number) {
  //   // idk 
  //   const items = this.dataSync.state().Products ?? [];
    
  // }
  // AddProduct() {
    
  // }
}

      
