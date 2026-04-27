import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import SideMenu from "@/components/Layout/SideMenu/SideMenu";
import SideMenuTrigger from "@/components/Layout/SideMenu/SideMenuTrigger";

const MOBILE_QUERY = "(max-width: 767px)";

export function Layout({ children }: { children: React.ReactNode }) {
    /* 모바일여부확인 */
    const isMobile = useMediaQuery(MOBILE_QUERY);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleToggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        if (!isMobile) {
            setIsMenuOpen(false);
        }
    }, [isMobile]);

    return (
        <>
            <Header />
            {isMobile && (
                <>
                    <SideMenuTrigger isOpen={isMenuOpen} onClick={handleToggleMenu} />
                    <SideMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
                </>
            )}
            <main>{children}</main> {/* 🔥 핵심 변경 */}
            <Footer />

        </>
    )

}