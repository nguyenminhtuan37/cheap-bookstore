import { Component, signal } from '@angular/core';
import { ProductInfo } from './products';

@Component({
  selector: 'PhieuChinhSua',
  imports: [],
  template: `
    <div id="ProductForm">
      <section>
        <h2>Tên tuổi</h2>
        <span>Tên sản phẩm <input type="text" /> Danh mục <input type="text" /></span>
        <h2>Tiền</h2>
        <span>Đơn vị tính <select></select> Giá nhập <input type="text" /> Giá bán <input type="text"</span>
        <h2>Số lượng tồn</h2>
        <span>Số lượng tồn <input type="text" /> Mức tồn tối thiểu <input type="text" /></span>
      </section>
      <button>Chỉnh sửa</button>
      <button>Tạo mới</button>
    </div>
  `,
  styles: ``,
})
export class ChinhSuaSp {
  ProductInfoForm = signal<ProductInfo>({
    id_sp: 0,
    ten_sp: '',
    danh_muc: '',
    don_vi_tinh: null,
    gia_nhap: 0,
    gia_ban: 0,
    so_luong_ton: 0,
    muc_ton_toi_thieu: 0,
    trang_thai: true,
  })

}
