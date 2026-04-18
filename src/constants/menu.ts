/* ACCOUNT MENU */
export const accountItems = [
    { label: "로그인", menuKey: "#" },
    { label: "회원가입", menuKey: "#" },
] as const;

/* MENUMAP */
export const menuMap = {
    wedding: {
        label: "셀프웨딩",
        type: "product",
        subMenus: [
            { label: "홈", menuKey: "home", path: "/", img: "/icons/sub-menu/home.png" },
            { label: "드레스", menuKey: "dress", path: "/wedding/dress", img: "/icons/sub-menu/wedding-dress.png" },
            { label: "턱시도", menuKey: "suit", path: "/wedding/suit", img: "/icons/sub-menu/suit.png" },
            { label: "구두", menuKey: "shoes", path: "/wedding/shoes", img: "/icons/sub-menu/shoes.png" },
            { label: "부케", menuKey: "bouquet", path: "/wedding/bouquet", img: "/icons/sub-menu/bouquet.png" },
            { label: "청첩장", menuKey: "invite", path: "/wedding/invite", img: "/icons/sub-menu/wedding-invitation.png" },
            { label: "스냅샷", menuKey: "snapshot", path: "/wedding/snapshot", img: "/icons/sub-menu/snapshot.png" },
        ],
    },
    rental: {
        label: "대여",
        type: "product",
        subMenus: [
            { label: "홈", menuKey: "home", path: "/rental/home", img: "/icons/sub-menu/home.png" },
            { label: "스튜디오", menuKey: "studio", path: "/rental/studio", img: "/icons/sub-menu/studio.png" },
            { label: "야외식장", menuKey: "outside", path: "/rental/outside", img: "/icons/sub-menu/outside.png" },
            { label: "웨딩카", menuKey: "weddingcar", path: "/rental/weddingcar", img: "/icons/sub-menu/weddingcar.png" },
        ],
    },
    community: {
        label: "커뮤니티",
        type: "community",
        subMenus: [
            { label: "공지사항", menuKey: "notice", path: "/community/notice", img: "/icons/sub-menu/notice.png" },
            { label: "자유게시판", menuKey: "board", path: "/community/board", img: "/icons/sub-menu/board.png" },
            { label: "결혼식구경하기", menuKey: "ceremony", path: "/community/ceremony", img: "/icons/sub-menu/ceremony.png" },
            { label: "정보공유", menuKey: "info", path: "/community/info", img: "/icons/sub-menu/info.png" },
        ],
    },
} as const;

export type MainMenuKey = keyof typeof menuMap;
export type SubMenuKey = typeof menuMap[MainMenuKey]["subMenus"][number]["menuKey"];

export type ProductMainKey = {
    [menuKey in MainMenuKey]: typeof menuMap[menuKey]["type"] extends "product"
    ? menuKey
    : never;
}[MainMenuKey];

export type CommunityMainKey = {
    [menuKey in MainMenuKey]: typeof menuMap[menuKey]["type"] extends "community"
    ? menuKey
    : never;
}[MainMenuKey];

export const mainMenuItems: { label: string; menuKey: MainMenuKey }[] =
    Object.entries(menuMap).map(([key, value]) => ({
        label: value.label,
        menuKey: key as MainMenuKey,
    }));

    
export type SubMenuKeyOf<T extends MainMenuKey> =
    typeof menuMap[T]["subMenus"][number]["menuKey"];


/* defaultSubMenu  */
export const defaulSubMenuByMain: Record<MainMenuKey, SubMenuKey> =
    Object.fromEntries(
        Object.entries(menuMap).map(([key, value]) => [
            key,
            value.subMenus[0].menuKey,
        ])
    ) as Record<MainMenuKey, SubMenuKey>;