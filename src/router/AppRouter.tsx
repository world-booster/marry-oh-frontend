import { useLocation, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import ProductListPage from "@/pages/Product/ProductListPage";
import ProductDetailPage from "@/pages/Product/ProductDetailPage";
import CommunityPage from "@/pages/Community/CommunityPage";
import RentalHomePage from "@/pages/Home/RentalHomePage";
import HomePage from "@/pages/Home/HomePage";
import type { MainMenuKey, SubMenuKey } from "@/constants/menu";
import { menuMap } from "@/constants/menu";
import type { UrlSegments } from "@/router/AppRouterInterface";
import { PATHS } from "@/router/Paths";

export default function AppRouter() {
  const location = useLocation();
  const { pathname, search } = location;

  const segments = pathname.split("/").filter(Boolean);

  const searchParams = new URLSearchParams(search);
  const productId = searchParams.get("id");

  /* 🔥 1️⃣ 상품 상세 먼저 처리 (가장 위) */
  if (productId) {
    return render(<ProductDetailPage id={productId} />);
  }

  /* 🔥 2️⃣ 홈 */
  if (segments.length === 0) {
    return render(<HomePage />);
  }

  const [mainRaw, subRaw, childRaw] = segments;

  const main = mainRaw as MainMenuKey;
  const sub = subRaw as SubMenuKey;
  const child = childRaw;

  const menu = getMainMenu(main);
  if (!menu) return notFound();

  const specialPage = getSpecialRoute(main, sub);
  if (specialPage) return render(specialPage);

  const subMenu = getSubMenu(menu, sub);
  if (!subMenu) return notFound();

  if (!child && hasChildren(subMenu) && subMenu.children.length > 0) {
    return <Navigate to={subMenu.children[0].path} replace />;
  }

  if (child && hasChildren(subMenu)) {
    const valid = subMenu.children.some((c: any) =>
      pathname.startsWith(c.path)
    );
    if (!valid) return notFound();
  }

  if (child && !hasChildren(subMenu)) {
    return notFound();
  }

  const params: UrlSegments = { main, sub, child };
  const page = getPageByType(menu.type, params);

  return render(page);
}

// ================= UTIL =================

function render(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
}

function notFound() {
  return <Navigate to={PATHS.NOT_FOUND} replace />;
}

function getMainMenu(main?: string) {
  if (!main || !(main in menuMap)) return null;
  return menuMap[main as MainMenuKey];
}

function getSubMenu(menu: any, sub?: string) {
  return menu.subMenus.find((m: any) => m.menuKey === sub);
}

function getSpecialRoute(main?: string, sub?: string) {
  if (main === "rental" && sub === "home") {
    return <RentalHomePage />;
  }
  return null;
}

function getPageByType(type: string, params: UrlSegments) {
  switch (type) {
    case "product":
      return <ProductListPage {...params} />;
    case "community": {
      return <CommunityPage />;
    }
    default:
      return notFound();
  }
}

function hasChildren(menu: any): menu is { children: any[] } {
  return "children" in menu && Array.isArray(menu.children);
}