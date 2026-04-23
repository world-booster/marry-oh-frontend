import { useNavigate } from "react-router-dom";
import type { MainMenuKey } from "@/constants/menu";
import styles from "@/components/Layout/Header/Header.module.css";
import MenuList from "@/components/Layout/Header/Navigation/MenuList";
import { menuMap, mainMenuItems, defaulSubMenuByMain } from "@/constants/menu";

interface MainMenuProps {
  selectedMainMenu: MainMenuKey;
  onHover?: (menuKey: MainMenuKey) => void;
  hoverMenu?: MainMenuKey;
}

export default function MainMenu({
  selectedMainMenu,
  onHover,
  hoverMenu
}: MainMenuProps) {
  const navigate = useNavigate();

  const handleClick = (menuKey: MainMenuKey) => {
    const defaultSub = defaulSubMenuByMain[menuKey];
    const item = menuMap[menuKey].subMenus.find(
      (subMenu) => subMenu.menuKey === defaultSub
    );

    if (!item) return;
    navigate(item.path);
  };

  return (
    <nav className={styles.nav} onClick={(e) => e.stopPropagation()}>
      <MenuList <MainMenuKey>
        className={styles.menuContainer}
        items={mainMenuItems}
        selectedMenu={selectedMainMenu}
        hoverMenu={hoverMenu}
        onItemClick={handleClick}
        onItemHover={onHover}
      />
    </nav>
  );
}