import { Service, inject, signal, computed } from "@angular/core";
import { DataSync } from "../shared/services/update-data.service";
import { ProductInfo, ProductState } from "../shared/models/product.model";

@Service({})
export class ProductAction {
    private dataSync = inject(DataSync);
    readonly selectedProduct = signal<ProductInfo | null>(null);
    readonly products = computed(() => this.dataSync.state().Products ?? []);

    getProductById(id_sp: number): ProductInfo | undefined {
        return this.products().find((product: ProductInfo) => product.id_sp === id_sp);
    }

    addProduct(newProduct: Omit<ProductInfo, 'id_sp'> & { id_sp?: number }): void {
        const currentProducts = this.products();
        const id = newProduct.id_sp ?? this.generateNewId(currentProducts);
        const itemToAdd: ProductInfo = {
            ...newProduct,
            id_sp: id,
        }
        
        this.dataSync.state.set({
            ...this.dataSync.state(),
            Products: [...currentProducts, itemToAdd],
        })
    }
    updateProduct(updatedProduct: ProductInfo): void {
        const currentProducts = this.products();
        const updatedList = currentProducts.map((item) =>
            item.id_sp === updatedProduct.id_sp ? { ...updatedProduct } : item
        );

        this.dataSync.state.set({
            ...this.dataSync.state(),
            Products: updatedList,
        });

        // Reset trạng thái đang chọn sau khi sửa xong
        if (this.selectedProduct()?.id_sp === updatedProduct.id_sp) {
            this.selectedProduct.set(null);
            console.log(44444444)
        }
    }
    deleteProduct(id_sp: number): void {
        const currentProducts = this.products();
        const filteredList = currentProducts.filter((item) => item.id_sp !== id_sp);
        this.dataSync.state.set({
            ...this.dataSync.state(),
            Products: filteredList,
        });

        // Nếu đang chỉnh sửa sản phẩm vừa bị xóa thì clear form
        if (this.selectedProduct()?.id_sp === id_sp) {
            this.selectedProduct.set(null);
        }
    }
    selectProductForEdit(id_sp: number): void {
        const foundItem = this.getProductById(id_sp);
        if (foundItem) {
            this.selectedProduct.set({ ...foundItem });
        }
    }

  /**
   * Hủy trạng thái chỉnh sửa / Reset form
   */
    clearSelection(): void {
        this.selectedProduct.set(null);
    }

  /**
   * Tự động sinh ID mới dựa trên ID lớn nhất hiện tại
   */
  private generateNewId(products: ProductInfo[]): number {
    if (!products || products.length === 0) return 1000;
    const maxId = Math.max(...products.map((p) => p.id_sp));
    return maxId + 1;
  }
}