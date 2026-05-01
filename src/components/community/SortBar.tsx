import type { SortType } from "@/type/community";
import styles from "./SortBar.module.css"

interface SortBarProps {
    sort: SortType;
    onChange: (sort: SortType) => void;
}

export default function SortBar({ sort, onChange }: SortBarProps) {
        return (
            <div className={styles.sortBar}>
                <button className={`${styles.sortButton} ${sort === "latest" ? styles.active : ""}`} onClick={() => onChange("latest")}>최신순</button>
                <button className={`${styles.sortButton} ${sort === "views" ? styles.active : ""}`} onClick={() => onChange("views")}>조회순</button>
                <button className={`${styles.sortButton} ${sort === "popular" ? styles.active : ""}`} onClick={() => onChange("popular")}>인기순</button>
            </div>
        )
}