import styles from "./SideMenu.module.css";

interface OverlayProps {
    isOpen: boolean,
    onClose: () => void
}

export default function Overlay({ 
    isOpen, 
    onClose 
}: OverlayProps) {
    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
                onClick={onClose}
            />
        </>
    );
}