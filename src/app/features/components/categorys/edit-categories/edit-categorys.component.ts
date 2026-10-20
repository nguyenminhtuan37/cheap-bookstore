import { Component, signal, inject, model, input } from "@angular/core";
import { category, categories } from "../../../../shared/models/category.model";
import { form, FormField } from "@angular/forms/signals";
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { Constant } from "../../../../shared/constants/data-constants";
import { CategorySync } from "../../../../shared/services/update-data-categories.service";
import { CateAction } from "../../../../services/category.service";

const Default_Model: category = {
    name : '',
    id: 0,
    desc: ''
}

@Component({
    selector: 'editCategory',
    templateUrl: './edit-categorys.component.html',
    styleUrl: 'styles.component.css',
    imports: [FormField]
})
export class editCategory {
    isModeCreateOfPopup: boolean = false;
    categorySync = inject(CategorySync);
    cateAction = inject(CateAction)
    state = model('none');
    localStorageService = inject(LocalStorageService);
    modelCategory = signal<category>({
        id: 0,
        name : '',
        desc: ''
    });
    formCategory = form(this.modelCategory);
    // demoCates = this.localStorageService.getItem('categoriesData')

    onHandleCancel() {
        this.state.set('none');
    }
    selectItem = input();
    onHandleSave() {
        console.log("save obj",this.modelCategory());
                // Lưu kết quả
                // dựa vaafo isModeCreateOfPopup để xác định
                
                // this.modelCategory.set({
                //     ...this.DEFAULT_CATEGORY_MODEL
                // });
            const currentList: category[] = this.localStorageService.getItem('categoriesData') ?? [];
                if(this.state() === 'create'){
                    // Lưu chỉ khi trường name ko trống
                    this.cateAction.addItem(this.modelCategory());
                }
                else if (this.state() === 'update'){
                    // Chỉnh sửa
                    const updatedItem = currentList.find((item) => item.id === this.selectItem())
                    this.cateAction.updateItem(this.modelCategory());
                }
    }
    generateNewId(categories: category[]): number {
        if (!categories || categories.length === 0) return 1000;
        const maxId = Math.max(...categories.map((p) => p.id));
        return maxId + 1;
    }
}