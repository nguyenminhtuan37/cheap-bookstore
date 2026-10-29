import { Component, signal, inject, model, input, effect, output } from "@angular/core";
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
    cateAction = inject(CateAction);
    state = model('none');
    localStorageService = inject(LocalStorageService);
    modelCategory = signal<category>({
        name : '',
        id: 0,
        desc: ''
    });
    formCategory = form(this.modelCategory);
    // demoCates = this.localStorageService.getItem('categoriesData');
    

    eventSucess = output();
    constructor() {
        effect(() => {
            const selectedItem = this.selectItem();
            if(this.selectItem() && this.state() !== 'create'){
                this.modelCategory.set({
                    ...selectedItem as category
                });
            }
            else{
                this.modelCategory.set({...Default_Model})
            }
        })
    }
    
    onHandleCancel() {
        this.state.set('none');
        this.modelCategory.set({...Default_Model});
    }
    selectItem = input<category>();
    onHandleSave() {
        console.log("save obj", this.modelCategory());      
        if(this.state() === 'create'){
            console.log(this.modelCategory().name)
            if (!this.modelCategory().name) {
                
                alert('Thiếu trường tên')
            }
            else {
                // Lưu chỉ khi trường name ko trống
                this.cateAction.addItem(this.modelCategory());
                this.state.set('none');
                alert('Thêm mới thành công!');
                this.eventSucess.emit();
            }
        }
        else if (this.state() === 'update'){
            console.log('selectItem: ', this.selectItem())
            // Chỉnh sửa
            this.cateAction.updateItem(this.modelCategory());
            this.state.set('none');
            alert('chỉnh sửa thành công!');
            this.eventSucess.emit();
        }
    }
    generateNewId(categories: category[]): number {
        if (!categories || categories.length === 0) return 1000;
        const maxId = Math.max(...categories.map((p) => p.id));
        return maxId + 1;
    }
    
}