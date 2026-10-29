import { Component, inject, signal, effect, model, computed } from "@angular/core";
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { categories, category } from "../../../shared/models/category.model";
import { CategorySync } from "../../../shared/services/update-data-categories.service";
import { ProductInfo } from "../../../shared/models/product.model";
import {editCategory} from "./edit-categories/edit-categorys.component";
import { CateAction } from "../../../services/category.service";
import { SortAndFilter } from "../../../services/sort-and-filter.service";

export type SortOrder = 'asc' | 'desc' | '';

export interface SortConfig {
    sortKey: keyof ProductInfo | '';
    order: SortOrder
}

export interface displayConfigInterface {
    sortValue: string,
    searchTerm: string,
    filterBy: string
}

@Component({
    standalone: true,
    selector: "category",
    styleUrls: ["../../../shared/styles/display.css", "../../../shared/styles/app.css"],
    templateUrl: "./category.html",
    imports: [editCategory],
})
export class Category{
    localStorageService = inject(LocalStorageService);
    cateSync: category[] = [];
    cateAction = inject(CateAction);
    sortAndFilter = inject(SortAndFilter);
    selectItem: any;
    constructor() {
        this.changeDisplay();
    }

    // currentCategory = computed(() => this.cateSync.demoCates().categoryList ?? [])
    // currentCates = computed(() => {
    //     let list = [...this.cateSync.demoCates().categoryList ?? []];
    //     const search = this.searchTerm().toLowerCase().trim();
    //     const sort = this.sortConfig();

    // });
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
            this.changeDisplay();
          }  
        } 
        else {
         alert("Không thể xóa danh mục vẫn còn hàng!");
        } 
    }
    // displayConfig_Default = {
    //     sortValue: 'name',
    //     sortDir: 'asc',
    //     searchTerm: '',
    //     filterBy: ''
    // }
    displayConfig = {
        sortValue: '',
        sortDir: '',
        searchTerm: '',
        filterBy: ''
    }
    // changeCatch = effect(() => {
    //     const displayConfig = this.displayConfig();
    //     this.changeDisplay(displayConfig.)
    // })
    changeDisplay() {
        // this.sortAndFilter.
        // this.sortAndFilter.ArraySort(sortValue, 'asc')
        const sortValue = this.displayConfig.sortValue;
        console.log('sortValue => ', sortValue);
        console.log('this.displayConfig.sortDir => ', this.displayConfig.sortDir);
        this.cateSync = this.sortAndFilter.searchFunc(this.displayConfig.searchTerm);
        this.cateSync = this.sortAndFilter.ArraySort(sortValue, this.displayConfig.sortDir);
        console.log(this.cateSync);
        
    }

    sortArray(value: Event) {
        const target = value.target as HTMLSelectElement;
        console.log('Giá trị mới:', target.value);
        this.displayConfig.sortValue = target.value;
        this.changeDisplay();
    }
    changeSortDir(value: Event) {
        const target = value.target as HTMLSelectElement;
        console.log('Giá trị mới:', target.value);
        this.displayConfig.sortDir = target.value;
        this.changeDisplay();
    }
    searchFunc(value: Event) {
        const target = value.target as HTMLSelectElement;
        console.log('Giá trị mới:', target.value);
        this.displayConfig.searchTerm = target.value;
        this.changeDisplay();
    }

    resetData(){
        console.log('đã nghe thấy');
        
        this.changeDisplay();

    }
}
    