import { Component, inject, signal, effect, model, computed } from "@angular/core";
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { categories, category } from "../../../shared/models/category.model";
import { CategorySync } from "../../../shared/services/update-data-categories.service";
import { ProductInfo } from "../../../shared/models/product.model";
import {editCategory} from "./edit-categories/edit-categorys.component";
import { CateAction } from "../../../services/category.service";

@Component({
    standalone: true,
    selector: "category",
    styleUrls: ["../../../shared/styles/display.css", "../../../shared/styles/app.css"],
    templateUrl: "./category.html",
    imports: [editCategory],
})
export class Category{
    localStorageService = inject(LocalStorageService);
    cateSync = inject(CategorySync);
    cateAction = inject(CateAction);
    selectItem: any;
    displayCategory = this.localStorageService.getItem('categoriesData') ?? [];
    
    updateItem(rowData: any){
        this.popupState = 'update';
        // đẩy thông tin vào popup
        this.selectItem = rowData;
    }

    protected popupState = 'none';
    
    onHandleCreate(){
        // this.formCategory.set(); // set data mặc định;
        this.popupState = 'create';
    }

    // confirm trước khi xóa
    onHandleConfirmDelete(rowData: any): void{
        this.selectItem = rowData;
        const products: ProductInfo[] = this.localStorageService.getItem("productsList");
        let count = 0
        // chỉ được phép xóa khi số sp trong danh mục bằng 0 và user confirm 
        for (let product of products) {
            if (product.danh_muc === rowData.name) count += 1;
        }
        if (count === 0) {
          if (confirm("Xóa danh mục sẽ là vĩnh viễn. Bạn có chắc không?")) {
            this.cateAction.deleteItem(this.selectItem);
          }  
        } 
        else {
         alert("Không thể xóa danh mục vẫn còn hàng!");
        } 
    }
}
    