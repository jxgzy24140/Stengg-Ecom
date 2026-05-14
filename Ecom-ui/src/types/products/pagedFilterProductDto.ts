export interface PagedFilterProductDto {
  keyword : string,
  categoryId: number | undefined,
  maxResultCount: 10,
  skipCount: 0,
  isDeleted: false,
}