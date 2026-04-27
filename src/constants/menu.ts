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
            {
                label: "홈",
                menuKey: "home",
                path: "/",
                img: "/icons/sub-menu/home.png"
            },
            {
                label: "신부",
                menuKey: "bride",
                path: "/wedding/bride",
                img: "/icons/sub-menu/bride.png",
                children: [
                    { id: "101010000000", label: "드레스", path: "/wedding/bride/dress" },
                    { id: "101020000000", label: "피로연의상", path: "/wedding/bride/afterdress" },
                    { id: "101030000000", label: "구두", path: "/wedding/bride/shoes" },
                    { id: "101040000000", label: "부케", path: "/wedding/bride/bouquet" },
                    { id: "101050000000", label: "메이크업", path: "/wedding/bride/makeup" },
                    { id: "101060000000", label: "여자헤어", path: "/wedding/bride/bridehair" },
                ]
            },
            {
                label: "신랑",
                menuKey: "groom",
                path: "/wedding/groom",
                img: "/icons/sub-menu/groom.png",
                children: [
                    { id: "102010000000", label: "턱시도", path: "/wedding/groom/tuxedo" },
                    { id: "102020000000", label: "와이셔츠", path: "/wedding/groom/shirt" },
                    { id: "102030000000", label: "정장바지", path: "/wedding/groom/pants" },
                    { id: "102040000000", label: "넥타이", path: "/wedding/groom/tie" },
                    { id: "102050000000", label: "구두", path: "/wedding/groom/shoes" },
                    { id: "102060000000", label: "남자헤어", path: "/wedding/groom/groomhair" },
                ]
            },
            {
                label: "스태프",
                menuKey: "staff",
                path: "/wedding/staff",
                img: "/icons/sub-menu/staff.png",
                children: [
                    { id: "103010000000", label: "촬영/영상", path: "/wedding/staff/snapshot" },
                    { id: "103020000000", label: "드레스헬퍼", path: "/wedding/staff/dresshelper" },
                    { id: "103030000000", label: "사회자", path: "/wedding/staff/mc" },
                    { id: "103040000000", label: "축가", path: "/wedding/staff/singer" },
                    { id: "103050000000", label: "음악", path: "/wedding/staff/music" },
                ]
            },
            {
                label: "결혼식용품",
                menuKey: "items",
                path: "/wedding/items",
                img: "/icons/sub-menu/items.png",
                children: [
                    { id: "104010000000", label: "청첩장", path: "/wedding/items/invite" },
                    { id: "104020000000", label: "답례품", path: "/wedding/items/gift" },
                    { id: "104030000000", label: "생화", path: "/wedding/items/flower" },
                    { id: "104040000000", label: "조화", path: "/wedding/items/artificialflower" },
                ]
            },
        ],
    },
    rental: {
        label: "렌탈",
        type: "product",
        subMenus: [
            {

                label: "홈",
                menuKey: "home",
                path: "/rental/home",
                img: "/icons/sub-menu/rental-home.png"
            },
            {
                label: "스튜디오",
                menuKey: "studio",
                path: "/rental/studio",
                img: "/icons/sub-menu/studio.png",
                children: [
                    { id: "201010000000", label: "서울", path: "/rental/studio/seoul" },
                    { id: "201020000000", label: "경기", path: "/rental/studio/gyeonggi" },
                    { id: "201030000000", label: "강원", path: "/rental/studio/gangwon" },
                    { id: "201040000000", label: "충북", path: "/rental/studio/chungbuk" },
                    { id: "201050000000", label: "충남", path: "/rental/studio/chungnam" },
                    { id: "201060000000", label: "대전", path: "/rental/studio/daejeon" },
                    { id: "201070000000", label: "경북", path: "/rental/studio/gyeongbuk" },
                    { id: "201080000000", label: "경남", path: "/rental/studio/gyeongnam" },
                    { id: "201090000000", label: "전북", path: "/rental/studio/jeonbuk" },
                    { id: "201100000000", label: "전남", path: "/rental/studio/jeonnam" },
                    { id: "201110000000", label: "제주", path: "/rental/studio/jeju" },
                ]
            },
            {
                label: "식장",
                menuKey: "weddinghall",
                path: "/rental/weddinghall",
                img: "/icons/sub-menu/weddinghall.png",
                children: [
                    { id: "202010000000", label: "실내식장", path: "/rental/weddinghall/inside" },
                    { id: "202020000000", label: "야외식장", path: "/rental/weddinghall/outside" },
                ]
            },
            {
                label: "케이터링",
                menuKey: "catering",
                path: "/rental/catering",
                img: "/icons/sub-menu/catering.png",
                children: [
                    { id: "203010000000", label: "한식", path: "/rental/catering/korean" },
                    { id: "203020000000", label: "양식", path: "/rental/catering/western" },
                    { id: "203030000000", label: "중식", path: "/rental/catering/chinese" },
                ]
            },
            {
                label: "웨딩카",
                menuKey: "weddingcar",
                path: "/rental/weddingcar",
                img: "/icons/sub-menu/weddingcar.png",
                children: [
                    { id: "204010000000", label: "의전용", path: "/rental/weddingcar/test" },
                ]
            },
        ],
    },
    community: {
        label: "커뮤니티",
        type: "community",
        subMenus: [
            {
                label: "공지사항",
                menuKey: "notice",
                path: "/community/notice",
                img: "/icons/sub-menu/notice.png",
                children: [

                ]
            },
            {
                label: "자유게시판",
                menuKey: "board",
                path: "/community/board",
                img: "/icons/sub-menu/board.png"
            },
            {
                label: "결혼식구경하기",
                menuKey: "ceremony",
                path: "/community/ceremony",
                img: "/icons/sub-menu/ceremony.png",
                children: [

                ]
            },
            // {
            //     label: "정보공유",
            //     menuKey: "info",
            //     path: "/community/info",
            //     img: "/icons/sub-menu/info.png",
            //     children: [
            //         { id: "4010000000", label: "결혼식꿀팁", path: "/community/info/tips" },

            //     ]
            // },
        ],
    },
} as const;

/* 메뉴키 */
export type MainMenuKey = keyof typeof menuMap;
export type SubMenuKey = typeof menuMap[MainMenuKey]["subMenus"][number]["menuKey"];

/* 상품메뉴 키*/
export type ProductMainKey = {
    [menuKey in MainMenuKey]: typeof menuMap[menuKey]["type"] extends "product"
    ? menuKey
    : never;
}[MainMenuKey];

export const mainMenuItems: { label: string; menuKey: MainMenuKey }[] =
    Object.entries(menuMap).map(([key, value]) => ({
        label: value.label,
        menuKey: key as MainMenuKey,
    }));




/* 메인메뉴의 기본서브메뉴  */
export const defaulSubMenuByMain: Record<MainMenuKey, SubMenuKey> =
    Object.fromEntries(
        Object.entries(menuMap).map(([key, value]) => [key, value.subMenus[0].menuKey,])
    ) as Record<MainMenuKey, SubMenuKey>;


/* 해당 카테고리 경로 */
export const categoryPathMap: Record<string, string> =
    Object.fromEntries(
        Object.values(menuMap).flatMap(main =>
            main.subMenus.flatMap(sub =>
                "children" in sub
                    ? sub.children.map(child => [child.id, child.path])
                    : []
            )
        )
    );

export const getCategoryPath = (categoryId: string): string | undefined => {
    return categoryPathMap[categoryId];
}