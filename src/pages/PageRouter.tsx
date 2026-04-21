import { useLocation, Navigate } from "react-router-dom";
import ProductPage from "@/pages/Product/ProductPage";
import CommunityPage from "@/pages/Community/CommunityPage";
import RentalHomePage from "@/pages/Home/RentalHomePage";
import type { MainMenuKey } from "@/constants/menu";
import { menuMap } from "@/constants/menu";

export default function PageRouter() {
    const { pathname } = useLocation();
    const [main, sub, child] = pathname.split("/").filter(Boolean);
    if (!main || !(main in menuMap)) {
        return <Navigate to="/not-found" replace />;
    }
    const menu = menuMap[main as MainMenuKey];
    const specialRoute = isSpecialRoute(main, sub);
    
    if (specialRoute) {
        return specialRoute;
    }
    const subMenu = menu.subMenus.find(menu => menu.menuKey === sub);
    if (!subMenu) {
        return <Navigate to="/not-found" replace />;
    }

    if (child && hasChildren(subMenu)) {
        const valid = subMenu.children.some(c =>
            pathname.startsWith(c.path)
        );

        if (!valid) {
            return <Navigate to="/not-found" replace />;
        }
    }

    return renderByType(menu.type);
}



function isSpecialRoute(main?: string, sub?: string) {
    if (main === "rental" && sub === "home") {
        return <RentalHomePage />;
    }
    return null;
}

function hasChildren(menu: any): menu is { children: any[] } {
    return "children" in menu && Array.isArray(menu.children);
}

function renderByType(type: string) {
    switch (type) {
        case "product":
            return <ProductPage />;
        case "community":
            return <CommunityPage />;
        default:
            return <Navigate to="/not-found" replace />;
    }
}