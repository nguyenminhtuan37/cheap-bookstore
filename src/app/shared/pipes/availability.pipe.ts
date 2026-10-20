import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'isAvailable',
})
export class CheckAvail implements PipeTransform {
    transform(value: boolean): string {
        return value ? "Còn hàng" : "Hết hàng";
    }
}