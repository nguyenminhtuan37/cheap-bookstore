import { categories, category } from "../shared/models/category.model";
import { Service, signal, inject, computed } from "@angular/core";
import { CategorySync } from "../shared/services/update-data-categories.service";
import { LocalStorageService } from "../shared/services/local-storage.service";
import { SortAndFilter } from "./sort-and-filter.service";
import { filter } from "rxjs";

@Service({})
export class CateAction {
    categorySync = inject(CategorySync);
    localStorageService = inject(LocalStorageService);
    
    selectProductForEdit(id: number): category | undefined {
        return this.categorySync.demoCates().categoryList?.find((item) => item.id === id);
    }
    addItem(newCategory: Omit<category, 'id'> & {id: number}): void {
        let newId = this.generateNewId(this.categorySync.demoCates().categoryList ?? []);
        const itemToAdd: category = {
            ...newCategory,
            id: newId
        };
        this.localStorageService.setItem('categoriesData', [...this.categorySync.demoCates().categoryList ?? [], itemToAdd])
        this.categorySync.demoCates.set({
            // ...this.categorySync.demoCates().categoryList,
            categoryList: [...this.categorySync.demoCates().categoryList ?? [], itemToAdd]
        });
    }
    updateItem(editedCategory: category): void {
        if (!editedCategory.id) {
            alert('No item found')
        }
        else {
            const updatedList = this.categorySync.demoCates().categoryList?.map(
                (item) => item.id === editedCategory.id ? {...editedCategory} : item
            );
            // this.categorySync.demoCates.set({
            //     // ...this.categorySync.demoCates().categoryList,
            //     categoryList: updatedList ?? []
            // });
            this.localStorageService.setItem('categoriesData', updatedList);
            this.categorySync.demoCates.set({
                // ...this.categorySync.demoCates().categoryList,
                categoryList: updatedList ?? []
            });
        }
        
    }
    deleteItem(selecteditem: any): void {
        if(!selecteditem){
            // báo lỗi
            return;
        }
        // destroy
        const filterItems = this.categorySync.demoCates().categoryList?.filter((item) => item.id !== selecteditem.id);
        this.localStorageService.setItem('categoriesData', filterItems);
        this.categorySync.demoCates.set({
                // ...this.categorySync.demoCates().categoryList,
                categoryList: filterItems ?? []
        });

    }
    generateNewId(categories: category[]): number {
        if (!categories || categories.length === 0) return 1000;
        const maxId = Math.max(...categories.map((p) => p.id));
        return maxId + 1;
    }
}