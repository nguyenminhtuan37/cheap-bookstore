import { Component, inject, input } from "@angular/core";
import { DataSync } from "../../../shared/services/update-data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductAction } from "../../../services/product.service";
import { CurrencyByChoice } from "../../../shared/pipes/currency.pipe";
import { ChinhSuaSp } from "../inventory/edit-ticket/edit-ticket.component";
import { ProductInfo } from "../../../shared/models/product.model";

@Component({
    selector: "product",
    styleUrls: ['../../../shared/styles/app.css', '../../../shared/styles/display.css'],
    templateUrl: "./products.html",
    imports: [CurrencyByChoice, ChinhSuaSp]
})
export class Product  {
  dataSync = inject(DataSync);
  route = inject(ActivatedRoute);
  productSync: ProductInfo[] = [];
  private productAction = inject(ProductAction);
  
  constructor() {
    this.changeDisplay();
  }
  
  
  // whats next?
  DeleteProduct(id: number): void {
    this.productAction.deleteProduct(id);
  }
  EditProduct(id: number) {
    this.productAction.selectProductForEdit(id);
  }
  displayConfig = {
    sortValue: 'ten_sp',
    sortDir: 'asc',
    searchTerm: '',
    filterBy: ''
  }
  changeDisplay() {
    const sortValue = this.displayConfig.sortValue;
        console.log('sortValue => ', sortValue);
        console.log('this.displayConfig.sortDir => ', this.displayConfig.sortDir);
        this.productSync = this.searchFunc(this.displayConfig.searchTerm);
        this.productSync = this.ArraySort(sortValue, this.displayConfig.sortDir);
        console.log(this.productSync);
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
  searchItem(value: Event) {
    const target = value.target as HTMLSelectElement;
    console.log('Giá trị mới:', target.value);
    this.displayConfig.searchTerm = target.value;
    this.changeDisplay();
  }
  filterBy(value: Event) {
    const target = value.target as HTMLSelectElement;
    console.log('Giá trị mới:', target.value);
    this.displayConfig.filterBy = target.value;
    this.changeDisplay();
  }

  private _curData: ProductInfo[] = [];
  searchFunc(value: string): ProductInfo[] {
          this._curData = [...this.dataSync.state().Products ?? []];
          console.log(this._curData);
          value.normalize("NFC").toLowerCase();
          let searchItems = this._curData?.filter((item) => 
              item.ten_sp.toLowerCase().includes(value) ||
              item.danh_muc.toLowerCase().includes(value)        
          );
          this._curData = searchItems;
          console.log(this._curData);
          
          // this.cateSync.demoCates.set({
          //     categoryList: searchItems
          // });
          return this._curData;
  }
  
  ArraySort(colName: string, order?: string): ProductInfo[] {
          let curDataSort = this._curData?.sort((a, b) => {
              const value1 = a[colName as keyof ProductInfo];
              const value2 = b[colName as keyof ProductInfo];
              let cmp = 0;
              if (typeof value1 === "string" && typeof value2 === "string") {
                  cmp = value1.localeCompare(value2);
              }
              else if (typeof value1 === "number" && typeof value2 === "number") {
                  cmp = value1 < value2 ? 1 : (value1 > value2 ? -1 : 0);
              }
              return order === 'asc' ? cmp : -cmp;
          });
          // this.cateSync.demoCates.set({
          //     categoryList: curDataSort,
          // });
          this._curData = curDataSort;
          return this._curData;
  }
}

      
