import { Pipe, PipeTransform } from "@angular/core";
import { Constant } from "../constants/data-constants";

@Pipe({
    name: 'currencyByChoice'
})
export class CurrencyByChoice implements PipeTransform {
    transform(value: number, choice: string): string {
        const curSymbols = new Map<string, string>();
        curSymbols.set(Constant.DVT.VND, "đ");
        curSymbols.set(Constant.DVT.USD, "đô la Mỹ");
        curSymbols.set("yên nhật", "yên Nhật");
        curSymbols.set("euro", "euro Âu")
        // Thêm dấu phẩy
        let valString: String = "";
        valString += String(Math.floor(value / 1000)) + "," + String(value % 1000);
        return valString + " " + curSymbols.get(choice);
    }
}