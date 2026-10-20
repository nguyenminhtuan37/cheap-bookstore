export interface category {
    name: string,
    id: number,
    desc: string,
}
export interface categories {
    categoryList: category[] | null;
}