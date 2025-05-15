export interface PaginationProps  {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
    loading: boolean
};