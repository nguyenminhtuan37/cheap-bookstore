import { Component } from "@angular/core";

interface ModelChoPhieu {
    stt: number,
    idPhieu: number,
    sanPham: string,
    soLuong: number,
    DVT: string,
    nhapXuat: boolean,
}
@Component({
    selector: 'phieuNhapXuat',
    templateUrl: '../models/PhieuNhapXuat.html',
    styleUrl: '../styles/others.css',
})
export class phieuNhapXuat {
    
}