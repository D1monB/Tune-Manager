import MyButton from "../MyButton/MyButton.tsx";
import styles from './Pagination.module.scss';
import { FC } from "react";
import { PaginationProps } from "./Pagination.props.ts";

const Pagination: FC<PaginationProps> = ({ page, totalPages, onChange, loading }) => {
    return (
        <div className={styles.pagination} data-testid="pagination" data-loading={loading ? 'true' : 'false'}>
            <MyButton
                onClick={() => onChange(page - 1)}
                disabled={loading || page <= 1}
                aria-disabled={loading || page <= 1 ? 'true' : 'false'}
                data-testid="pagination-prev"
            >
                Prev
            </MyButton>
            <span>{page} / {totalPages ? totalPages : page}</span>
            <MyButton
                onClick={() => onChange(page + 1)}
                disabled={loading || page >= totalPages}
                aria-disabled={loading || page >= totalPages ? 'true' : 'false'}
                data-testid="pagination-next"
            >
                Next
            </MyButton>
        </div>
    );
};

export default Pagination;
