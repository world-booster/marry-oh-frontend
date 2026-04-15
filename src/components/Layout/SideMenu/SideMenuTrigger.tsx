import styles from "./SideMenu.module.css";


interface SideMenuTriggerProps {
    isOpen: boolean;
    onClick: () => void;
}

export default function SideMenuTrigger({
    isOpen,
    onClick
}: SideMenuTriggerProps) {
    return (
        <button
            type="button"
            className={`${styles.trigger} ${isOpen ? styles.active : ""}`}
            onClick={onClick}
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isOpen}
        >
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`} aria-hidden="true"></i>
        </button>
    );
}