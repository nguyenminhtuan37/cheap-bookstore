import { Component, inject, signal } from '@angular/core';

import { DataSync } from '../service/updateData.service';
import {form, FormField} from '@angular/forms/signals';
import { ProductInfo } from './products';

interface ProductFormModel {
  id_sp: number;
  ten_sp: string;
  danh_muc: string;
  don_vi_tinh: string;
  gia_nhap: number;
  gia_ban: number;
  so_luong_ton: number;
  muc_ton_toi_thieu: number;
  trang_thai: boolean;
}
@Component({
  selector: 'PhieuChinhSua',
  imports: [FormField],
  templateUrl: "../models/PhieuChinhSua.html",
  styleUrls: ["../styles/others.css"],
})
export class ChinhSuaSp {
  dataSync = inject(DataSync);
  isEditing: boolean = false;
  isMakingNew: boolean = true;
  ProductModel = signal<ProductFormModel>({
    id_sp: 1000,
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
  AddProduct() {
    // add it up
    const formData = this.ProductModel();
    const items = [...(this.dataSync.state().Products ?? []), ...[formData as ProductInfo]];
    console.log(items);
    this.dataSync.state.set(
      {Products: items}
    )
  }

  EditProduct(id_sp: number) {
    const formData = this.ProductModel();
    const items = this.dataSync.state().Products ?? [];
    let foundItem = items.find(item => item.id_sp === id_sp);
    this.ProductModel.set(
      foundItem as ProductFormModel,
    )
    console.log(this.ProductModel())
  }
  
}
