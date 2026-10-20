import { Component, effect, inject, signal } from '@angular/core';

import { DataSync } from '../../../../shared/services/update-data.service';
import {form, FormField} from '@angular/forms/signals';
import { Constant } from '../../../../shared/constants/data-constants';
import { ProductAction } from '../../../../services/product.service';
import { ProductInfo } from '../../../../shared/models/product.model';

const DEFAULT_FORM_MODEL: ProductInfo = {
  id_sp: 0,
  ten_sp: '',
  danh_muc: '',
  don_vi_tinh: '',
  gia_nhap: 0,
  gia_ban: 0,
  so_luong_ton: 0,
  muc_ton_toi_thieu: 0,
  trang_thai: true,
}
@Component({
  selector: 'PhieuChinhSua',
  imports: [FormField],
  templateUrl: "./edit-ticket.html",
  // styleUrls: ["../styles.css"],
})
export class ChinhSuaSp {
  dataSync = inject(DataSync);
  productAction = inject(ProductAction);
  isEditing = false;
  DVT = Constant.DVT;
  ProductModel = signal<ProductInfo>({
    id_sp: 0,
    ten_sp: '',
    danh_muc: '',
    don_vi_tinh: 'viet nam dong',
    gia_nhap: 0,
    gia_ban: 0,
    so_luong_ton: 0,
    muc_ton_toi_thieu: 0,
    trang_thai: true,
});

  ProductForm = form(this.ProductModel);
  constructor () {
    effect(() => {
      const selected = this.productAction.selectedProduct();
      if (selected) {
        this.ProductModel.set({...selected});
      } else {
        this.resetForm();
      }
    })
  }

  updateProduct() {
    // add it up
    const FormModel = this.ProductModel();
    if(FormModel.id_sp & +(FormModel.id_sp > 0)) {
      // Chỉnh sửa
      this.isEditing = true;
      this.productAction.updateProduct(FormModel);
    } else {
      // Thêm mới
      this.productAction.addProduct(FormModel);
    }
  }
  resetForm() {
    this.ProductModel.set({...DEFAULT_FORM_MODEL});
    this.productAction.clearSelection();
  }
}
