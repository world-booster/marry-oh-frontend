import type { MainMenuKey } from "../Header";
import styles from "../Header.module.css";
import MenuList from "./MenuList";

interface NavigationProps {
  isNavOpen: boolean;
  selectedMenu: MainMenuKey;
  closeNav: () => void;
  onMenuChange: (menu: MainMenuKey) => void;
}

const menuItems = [
  { label: "셀프웨딩", href: "wedding", menuKey: "wedding" },
  { label: "예식장", href: "#hall", menuKey: "hall" },
  { label: "커뮤니티", href: "#community", menuKey: "community" },
];


export default function Navigation({
  isNavOpen,
  closeNav,
  onMenuChange
}: NavigationProps) {

  const handleMenuClick = (menuKey?: string) => {
    onMenuChange(menuKey as MainMenuKey);
  }


  return (
    <nav
      className={`${styles.nav} ${isNavOpen ? styles.open : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <MenuList className={styles["menu-container"]} items={menuItems} onItemClick={closeNav} />
    </nav>
  );
}

