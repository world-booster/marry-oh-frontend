import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { MainMenuKey, SubMenuKey } from "@/constants/menu";
import { defaulSubMenuByMain } from "@/constants/menu";

interface MenuContextType {
    selectedMainMenu: MainMenuKey;
    selectedSubMenu: SubMenuKey;
    changeMainMenu: (menu: MainMenuKey) => void;
    changeSubMenu: (menu: SubMenuKey) => void;
}

const MenuContext = createContext<MenuContextType | null>(null);

export function MenuProvider({ children }: { children: ReactNode }) {
    const [selectedMainMenu, setSelectMainMenu] = useState<MainMenuKey>("wedding");
    const [selectedSubMenu, setSelecSubMenu] = useState<SubMenuKey>("dress");

    const changeMainMenu = (menu: MainMenuKey) => {
        setSelectMainMenu(menu);
        /*메인메뉴 변경 시 서브메뉴 기본값으로 초기화*/
        setSelecSubMenu(defaulSubMenuByMain[menu]);
    }

    const changeSubMenu = (menu: SubMenuKey) => {
        setSelecSubMenu(menu);
    }
    return (
        <MenuContext.Provider
            value={{
                selectedMainMenu,
                selectedSubMenu,
                changeMainMenu,
                changeSubMenu
            }}
        >
            {children}
        </MenuContext.Provider>
    )
}

export function useMenu() {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("The 'useMenu' must be used within MenuProvider.");
    }
    return context;
}