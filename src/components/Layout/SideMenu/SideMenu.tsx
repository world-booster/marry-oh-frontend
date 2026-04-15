import styles from "./SideMenu.module.css";
import SideMenuList from "./SideMenuList";
import Overlay from "./Overlay";
import Logo from "../../Logo/Logo";

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const sideMenuItems = [
    { label: "홈", href: "#" },
    { label: "소개", href: "#" },
    { label: "로그인", href: "#" },
    { label: "회원가입", href: "#" },
];

export default function SideMenu({
    isOpen,
    onClose
}: SideMenuProps) {
    return (
        <>
            <Overlay isOpen={isOpen} onClose={onClose} />
            <aside className={`${styles.sideMenu} ${isOpen ? styles.open : ""}`}>
                <Logo />
                <SideMenuList items={sideMenuItems} className={styles.menuList} onItemClick={onClose} />
            </aside>
        </>
    );
}