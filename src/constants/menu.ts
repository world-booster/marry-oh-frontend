/* ACCOUNT MENU */
export const accountItems = [
    { label: "로그인", menuKey: "#" },
    { label: "회원가입", menuKey: "#" },
];

/* MAINMENU */
export type MainMenuKey = "wedding" | "rental" | "community";

export const menuItems: { label: string; menuKey: MainMenuKey }[] = [
    { label: "셀프웨딩", menuKey: "wedding" },
    { label: "대여", menuKey: "rental" },
    { label: "커뮤니티", menuKey: "community" },
];

/* SUBMENU */
export type SubMenuKey =
/* wedding */ "dress" | "suit" | "bouquet" | "snapshot" | "invite" | "items" |
/* rental */ "studio" | "outside" | "weddingcar" |
/* community */ "notice" | "board" | "ceremony" | "info";

export const secondaryMenuMap: Record<MainMenuKey, { label: string, menuKey: SubMenuKey, img?: string }[]> =
{
    wedding: [
        { label: "드레스", menuKey: "dress", img: "/icons/sub-menu/wedding-dress.png" },
        { label: "턱시도", menuKey: "suit", img: "/icons/sub-menu/suit.png" },
        { label: "부케", menuKey: "bouquet", img: "/icons/sub-menu/bouquet.png" },
        { label: "청첩장", menuKey: "invite", img: "/icons/sub-menu/wedding-invitation.png" },
        { label: "웨딩소품", menuKey: "items", img: "/icons/sub-menu/items.png" },
        { label: "스냅샷", menuKey: "snapshot", img: "/icons/sub-menu/snapshot.png" },
    ],
    rental: [
        { label: "스튜디오", menuKey: "studio", img: "/icons/sub-menu/studio.png" },
        { label: "야외식장", menuKey: "outside", img: "/icons/sub-menu/outside.png" },
        { label: "웨딩카", menuKey: "weddingcar", img: "/icons/sub-menu/weddingcar.png" },
    ],
    community: [
        { label: "공지사항", menuKey: "notice", img: "/icons/sub-menu/notice.png" },
        { label: "자유게시판", menuKey: "board", img: "/icons/sub-menu/board.png" },
        { label: "결혼식구경하기", menuKey: "ceremony", img: "/icons/sub-menu/ceremony.png" },
        { label: "정보공유", menuKey: "info", img: "/icons/sub-menu/info.png" },
    ]
}

/* MAINMENU-SUBMENU */
export const defaulSubMenuByMain: Record<MainMenuKey, SubMenuKey> = {
    wedding: "dress",
    rental: "studio",
    community: "notice",
}