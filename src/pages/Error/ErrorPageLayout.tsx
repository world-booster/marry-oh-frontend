import { useNavigate } from "react-router-dom";
import styles from "@/pages/Error/ErrorPage.module.css";

interface ErrorLayoutProps {
    code: number;
    title: string;
    description?: string;
    showHomeButton?: boolean;
    showBackButton?: boolean;
}

export default function ErrorLayout({
    code,
    title,
    description,
    showHomeButton = true,
    showBackButton = true,
}: ErrorLayoutProps) {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.code}>{code}</h1>
                <h2 className={styles.title}>{title}</h2>
                {description && <p className={styles.desc}>{description}</p>}

                <div className={styles.buttonGroup}>
                    {showHomeButton && (
                        <button className={styles.primaryBtn} onClick={() => navigate("/")}>
                            홈으로 이동
                        </button>
                    )}

                    {showBackButton && (
                        <button className={styles.secondaryBtn} onClick={() => navigate(-1)}>
                            이전 페이지
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

