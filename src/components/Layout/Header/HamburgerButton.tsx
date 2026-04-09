import styles from "./Header.module.css";

interface HamburgerButtonProps {
    isNavOpen: boolean;
    toggleNav: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function HamburgerButton(
    { isNavOpen, toggleNav }: HamburgerButtonProps) {
    return (
        <button
            type="button"
            className={styles.hamburger}
            onClick={toggleNav}
            aria-label={isNavOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isNavOpen}
        >
            <i className={`fas ${isNavOpen ? "fa-times" : "fa-bars"}`} aria-hidden="true"></i>
        </button>
    );
}