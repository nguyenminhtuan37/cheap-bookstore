import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'currencyByChoice'
})
export class CurrencyByChoice implements PipeTransform {
    transform(value: number, choice: string): string {
        const curSymbols = new Map<string, string>();
        curSymbols.set("viet nam dong", "đ");
        curSymbols.set("đô la mỹ", "đô la Mỹ");
        curSymbols.set("yên nhật", "yên Nhật");
        curSymbols.set("euro", "euro Âu")
        // Thêm dấu phẩy
        let valString: String = "";
        valString += String(Math.floor(value / 1000)) + "," + String(value % 1000);
        return valString + " " + curSymbols.get(choice);
    }
}