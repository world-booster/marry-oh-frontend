import { useEffect, useRef, useState } from "react";
import styles from "./ProductDetailPage.module.css";
import detail from "@/data/wedding/product/mockProductDetail.json";

interface ProductDetail {
    id: string;
    title: string;
    vendor: string;
    originalPrice: number;
    finalPrice: number;
    discountRate: number;
    thumbnails: string[];
    detailImages: string[];
    description: string;
    rating: number;
    reviewCount: number;
}

interface Props {
    id: string;
}

export default function ProductDetailPage({ id }: Props) {

    /* 🔥 상태 */
    const [tab, setTab] = useState<"detail" | "review" | "qna" | "shipping">("detail");
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    /* 🔥 펼침 관련 */
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflow, setIsOverflow] = useState(false);

    /* 🔥 refs */
    const detailRef = useRef<HTMLDivElement>(null);
    const qnaRef = useRef<HTMLDivElement>(null);
    const shippingRef = useRef<HTMLDivElement>(null);
    const reviewRef = useRef<HTMLDivElement>(null);
    const detailContentRef = useRef<HTMLDivElement>(null);

    /* 🔥 데이터 로딩 */
    useEffect(() => {
        if (!id) return;

        const data = detail[id as keyof typeof detail];
        setProduct(data ?? null);
        setSelectedImage(0);
    }, [id]);

    /* 🔥 높이 체크 */
    useEffect(() => {
        if (!detailContentRef.current) return;

        const checkHeight = () => {
            const height = detailContentRef.current!.scrollHeight;
            setIsOverflow(height > 900);
        };

        checkHeight(); // 초기 실행

        // 🔥 이미지 로딩 완료 후 다시 측정
        const images = detailContentRef.current.querySelectorAll("img");

        images.forEach(img => {
            if (!img.complete) {
                img.addEventListener("load", checkHeight);
            }
        });

        return () => {
            images.forEach(img => {
                img.removeEventListener("load", checkHeight);
            });
        };
    }, [product]);

    /* 🔥 탭 이동 */
    const handleTabClick = (
        key: typeof tab,
        ref: React.RefObject<HTMLDivElement | null>
    ) => {
        setTab(key);
        ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    /* 🔥 early return (Hook 이후!) */
    if (!product) return <div>상품을 찾을 수 없습니다.</div>;

    const thumbnails = product.thumbnails;

    return (
        <div className="contentsContainer">
            <div className={styles.topSection}>

                {/* 이미지 */}
                <div className={styles.imageSection}>
                    <div className={styles.thumbnailList}>
                        {thumbnails.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                className={idx === selectedImage ? styles.thumbnailActive : styles.thumbnail}
                                onClick={() => setSelectedImage(idx)}
                            />
                        ))}
                    </div>

                    <div className={styles.mainImage}>
                        <img src={thumbnails[selectedImage] ?? thumbnails[0]} alt={product.title} />
                    </div>
                </div>

                {/* 구매 영역 */}
                <div className={styles.purchaseSection}>
                    <div className="meta">
                        <div className={styles.vendor}>{product.vendor}</div>
                        <div className={styles.title}>{product.title}</div>

                        <div className={styles.rating}>
                            ⭐ {product.rating} <span>({product.reviewCount})</span>
                        </div>

                        <div className={styles.priceBox}>
                            {product.discountRate > 0 && (
                                <div className={styles.discountRow}>
                                    <span className={styles.discount}>
                                        {product.discountRate * 100}%
                                    </span>
                                    <span className={styles.originalPrice}>
                                        {product.originalPrice.toLocaleString()}원
                                    </span>
                                </div>
                            )}

                            <div className={styles.finalPrice}>
                                {product.finalPrice.toLocaleString()}
                                <span className={styles.notBold}>원</span>
                            </div>
                        </div>

                        {/* 옵션 */}
                        <div className={styles.optionSelectBox}>
                            <label>옵션 선택</label>
                            <select>
                                <option>기본 옵션</option>
                                <option>테스트 옵션</option>
                            </select>
                        </div>

                        {/* 수량 */}
                        <div className={styles.quantityWrapper}>
                            <span>수량</span>
                            <div className={styles.quantityBox}>
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>
                        </div>

                        {/* 총 금액 */}
                        <div className={styles.totalBox}>
                            <span>총 상품 금액</span>
                            <strong>
                                {(product.finalPrice * quantity).toLocaleString()}원
                            </strong>
                        </div>

                        {/* 버튼 */}
                        <div className={styles.actions}>
                            <button className={styles.cartBtn}>장바구니</button>
                            <button className={styles.buyBtn}>구매하기</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 탭 */}
            <div className={styles.tabs}>
                <button onClick={() => handleTabClick("detail", detailRef)} className={tab === "detail" ? styles.active : ""}>상품정보</button>
                <button onClick={() => handleTabClick("qna", qnaRef)} className={tab === "qna" ? styles.active : ""}>문의</button>
                <button onClick={() => handleTabClick("shipping", shippingRef)} className={tab === "shipping" ? styles.active : ""}>배송/환불</button>
                <button onClick={() => handleTabClick("review", reviewRef)} className={tab === "review" ? styles.active : ""}>리뷰</button>
            </div>

            {/* 컨텐츠 */}
            <div className={styles.content}>

                {/* 상세 */}
                <div ref={detailRef} className={styles.section}>
                    <div>상품정보</div>

                    <div
                        ref={detailContentRef}
                        className={`${styles.detailContent} ${!isExpanded ? styles.collapsed : ""}`}
                    >
                        {product.detailImages.map((img, idx) => (
                            <img key={idx} src={img} className={styles.detailImage} />
                        ))}

                        <p>{product.description}</p>
                    </div>

                    {isOverflow && (
                        <div className={styles.expandBox}>
                            <button
                                className={styles.expandBtn}
                                onClick={() => {
                                    setIsExpanded(v => !v);

                                    if (isExpanded) {
                                        detailRef.current?.scrollIntoView({ behavior: "smooth" });
                                    }
                                }}
                            >
                                {isExpanded ? "접기" : "상품정보 더보기"}
                            </button>
                        </div>
                    )}
                </div>

                {/* 문의 */}
                <div ref={qnaRef} className={styles.section}>
                    <div>문의</div>
                    <p>문의 내용 영역</p>
                </div>

                {/* 배송 */}
                <div ref={shippingRef} className={styles.section}>
                    <div>배송 및 환불 정책</div>
                    <p>배송 및 환불 정책</p>
                </div>

                {/* 리뷰 */}
                <div ref={reviewRef} className={styles.section}>
                    <div>리뷰</div>
                    <p>리뷰 목록</p>
                </div>

            </div>
        </div>
    );
}