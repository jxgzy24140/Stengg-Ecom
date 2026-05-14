export interface PagedFilterResultDto<T> {
    items: T[];
    totalCount: number;
}