import { Component, signal } from "@angular/core";
import { LocalStorageService } from "../../../../shared/services/local-storage.service";
import { form, FormField, required } from "@angular/forms/signals";

export interface displayItems {
    id_sp: number | null,
    so_luong: number | null,
    don_gia: number | null,
    thanh_tien: number,
}
export interface modelPhieu {
    displayItems: displayItems[] | null
}
@Component({
    selector: 'phieuNhapXuat',
    templateUrl: './import-export.html',
    styleUrl: '../styles.css',
    imports: [FormField],
})
export class phieuNhapXuat {
    isImporting: boolean = true;
    protected AddedItems = signal<modelPhieu>({
        displayItems: [
        {
            id_sp: 102,
            so_luong: 11,
            don_gia: 11000,
            thanh_tien: 121000
        },
        {
            id_sp: 103,
            so_luong: 12,
            don_gia: 12000,
            thanh_tien: 144000,
        }
    ]});
    private curData = this.AddedItems().displayItems ?? [];
    modelReceipt = signal<displayItems>({
            id_sp: null,
            so_luong: null,
            don_gia: null,
            thanh_tien: 0
    });
    formReceipt = form(this.modelReceipt, (schemaPath) => {
        required(schemaPath.id_sp, {message: 'Thiếu trường id'});
        required(schemaPath.so_luong, {message: 'Thiếu trường số lượng'});
        required(schemaPath.don_gia, {message: 'Thiếu trường đơn giá'});
    });
    deleteItem(row: any) {
        this.AddedItems.set({
            displayItems: this.curData?.filter((item) => item.id_sp === row.id_sp)
        })
    }
    AddItems(): void {
        this.formReceipt().markAsTouched();
        this.AddedItems.set({
            displayItems: [...this.curData, this.modelReceipt()]
        })
    }
}