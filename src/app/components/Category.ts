import { Component, inject, signal } from "@angular/core";
import { LocalStorageService } from "../service/local-storage.service";
import  data  from "../category.json";

export interface category {
    name: string,
    id: number,
    desc: string,
}
export interface categories {
    Category_list: category[] | null;
}

@Component({
    standalone: true,
    selector: "category",
    styleUrls: ["../styles/display.css", "../styles/app.css"],
    template: `
    
    <table>
        <tr>
            <td>Id</td>
            <td>Tên danh mục</td>
            <td>Mô tả</td>
            <td>Actions</td>
        </tr>
        @for (cate of demoCates().Category_list ?? []; track $index) {
            <tr>
                <td>{{ cate.id }}</td>
                <td>{{ cate.name }}</td>
                <td>{{ cate.desc }}</td>
                <td>
                    <button (click)="EditItem(cate.id)">Edit</button>
                    <button (click)="DeleteItem(cate.id)">Delete</button>
                </td>
            </tr>
        }
    </table>
    `,
})
export class Category{
    demoCates = signal<categories>({Category_list: [
        {
            "name": "Truyện tranh",
            "id": 101,
            "desc": "Truyện tranh hihi"
        },
        {
            "name": "Truyện chữ",
            "id": 102,
            "desc": "Chữ"
        },
        {
            "name": "Sách giáo khoa",
            "id": 103,
            "desc": "Lớp 1"
        },
        {
            "name": "Sách giáo trình",
            "id": 104,
            "desc": "Đại học"
        },
        {
            "name": "Sách song ngữ",
            "id": 105,
            "desc": "Nature"
        }
    ]});
    localStorageService = inject(LocalStorageService);
    
    ngOnInit() {
        if (!this.localStorageService.getItem("Categories")) {
            this.localStorageService.setItem("Categories", data);
        }
        // **
    }
    addItem() {

    }
    DeleteItem(id_cate: number) {
        // destroy
        const displayItems = this.demoCates().Category_list ?? [];
        this.demoCates.set({
            Category_list: displayItems.filter((cate) => cate.id !== id_cate)
        });
    }
    EditItem(id_cate: number) {
        
    }
    // private data = signal<categories>(
    //     JSON.parse(demoCates) as categories
    // )
}
    