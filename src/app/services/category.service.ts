import { categories, category } from "../shared/models/category.model";
import { Service, signal, inject } from "@angular/core";
import { FormField, form } from "@angular/forms/signals";
import { CategorySync } from "../shared/services/update-data-categories.service";

const Default_Model: category = {
    name : '',
    id: 0,
    desc: ''
}

@Service({})
export class CateAction {
    categorySync = inject(CategorySync);
    
    protected currentCates = this.categorySync.demoCates().categoryList ?? [];

    selectProductForEdit(id: number): category | undefined {
        return this.categorySync.demoCates().categoryList?.find((item) => item.id === id);
    }
    addItem(newCategory: Omit<category, 'id'> & {id: number}): void {
        if (!newCategory.name) {
            alert('Thiếu trường tên')
        }
        else {
            let newId = this.generateNewId(this.currentCates);
            const itemToAdd: category = {
                ...newCategory,
                id: newId
            };
            this.categorySync.demoCates.set({
                categoryList: [...this.currentCates, itemToAdd]
            });
        }
    }
    updateItem(editedCategory: category): void {
        if (!editedCategory.id) {
            alert('No item found')
        }
        else {
            const updatedList = this.currentCates.map(
                (item) => item.id === editedCategory.id ? {...editedCategory} : item
            );
            this.categorySync.demoCates.set({
                ...this.categorySync.demoCates().categoryList,
                categoryList: updatedList
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

        this.categorySync.demoCates.set({
            ...this.categorySync.demoCates().categoryList,
            categoryList: filterItems as category[]
        })
    }
    generateNewId(categories: category[]): number {
        if (!categories || categories.length === 0) return 1000;
        const maxId = Math.max(...categories.map((p) => p.id));
        return maxId + 1;
    }
}