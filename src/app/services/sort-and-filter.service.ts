import { computed, inject, Service, signal } from "@angular/core";
import { category } from "../shared/models/category.model";
import { filter } from "rxjs";
import { ProductInfo } from "../shared/models/product.model";
import { CategorySync } from "../shared/services/update-data-categories.service";
import { LocalStorageService } from "../shared/services/local-storage.service";


@Service({})
export class SortAndFilter {
    cateSync = inject(CategorySync);  // Lưu data category đầy đủ ở local storage

    private _curData: category[] = []; // Lưu data hiện tại (sau khi đã filter hoặc sort);

    constructor(){
        this._curData = [...this.cateSync.demoCates().categoryList || [] ];
    }
    // sort for me
    searchFunc(value: string): category[] {
        this._curData = [...this.cateSync.demoCates().categoryList || [] ];
        console.log(this._curData);
        value.normalize("NFC").toLowerCase();
        let searchItems = this._curData?.filter((item) => 
            item.name.toLowerCase().includes(value) ||
            item.desc.toLowerCase().includes(value)        
        );
        this._curData = searchItems;
        console.log(this._curData);
        
        return this._curData;
    }

    ArraySort(colName: string, order?: string): category[] {
        let curDataSort = this._curData?.sort((a, b) => {
            const value1 = a[colName as keyof category];
            const value2 = b[colName as keyof category];
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
    FilterBy(category: string) {
        const curData: category[] = this.cateSync.demoCates().categoryList ?? [];
        this._curData = curData.filter((item) => item.name === category);
        // this.cateSync.demoCates.set({
        //     categoryList: curData?.filter((item) => item.name === category)
        // })
        return this._curData;
    }
    
}