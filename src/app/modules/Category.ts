import { Component, signal } from "@angular/core";
import { LocalStorageService } from "../service/local-storage.service";
import  demoCates  from "../category.json";

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
    template: `

    `,
})
export class Category{
    // private data = signal<categories>(
    //     JSON.parse(demoCates) as categories
    // )
}
    // <table>
    // @for (cate of demoCate; track cate.id) {}
    // <tr>
    //     <td>{{ demoCates.name }}</td>
    //     <td>{{ demoCates.id }}</td>
    //     <td>{{ demoCates.desc }}</td>
    //     <button>Chỉnh sửa</button>
    //     <button>Xóa</button>
    // </tr>
    // </table>