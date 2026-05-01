import styles from "./Pagination.module.css"

interface PaginationProps {
    page: number;
    total: number;
    onChange: (page: number) => void;
}

export default function Pagination({ page, total, onChange }: PaginationProps) {
    
    const handlePrev = () => {
        if (page > 1) onChange(page -1);
    };

    const handleNext = () => {
        if (page < total) onChange(page +1);
    };

    return (
        <div className={styles.pagination}>
            <button className={styles.pageButton} onClick={handlePrev}>이전</button>
            <span className={styles.pageButton}>{page}</span>
            <button className={styles.pageButton} onClick={handleNext}>다음</button>
        </div>
    );
}