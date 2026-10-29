import {Service} from "@angular/core"
import {signal, effect, inject} from "@angular/core"
import {LocalStorageService} from "./local-storage.service"
import {categories} from "../models/category.model"

@Service({})
export class CategorySync {
    localStorageService = inject(LocalStorageService)
    demoCates = signal<categories>({
        categoryList: this.localStorageService.getItem("categoriesData")!
    });
    // updateData = effect(() => this.localStorageService.setItem('categoriesData', this.demoCates().categoryList))
}