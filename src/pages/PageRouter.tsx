import { useParams, Navigate } from "react-router-dom";
import ProductPage from "@/pages/Product/ProductPage";
import CommunityPage from "@/pages/Community/CommunityPage";
import type { MainMenuKey } from "@/constants/menu";
import { menuMap } from "@/constants/menu";

export default function PageRouter() {

    const { main, sub } = useParams();
    if (!main || !(main in menuMap)) {
        return <Navigate to="/not-found" replace />;
    }
    const mainKey = main as MainMenuKey;
    const menu = menuMap[mainKey];

    const isValidSub = menu.subMenus.some((item) => item.menuKey === sub);
    if (!sub || !isValidSub) {
        return <Navigate to="/not-found" replace />;
    }

    const pageByType = {
        product: <ProductPage />,
        community: <CommunityPage />,
    };

    return pageByType[menu.type];
}