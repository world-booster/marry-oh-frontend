import styles from "./TagFilter.module.css"

interface TagFilterProps {
    selected: string | null;
    onChange: (tag: string) => void;
}

export default function TagFilter({ selected, onChange }: TagFilterProps) {
    const tags = ["자유", "후기", "공략"];

    return (
        <div className={styles.tags}>
            {tags.map((tag) => (
                <button key={tag} className={`${styles.tag} ${selected === tag ? styles.active : ""}`} onClick={() => onChange(tag)}>#{tag}</button>
            ))}
        </div>
    );
}