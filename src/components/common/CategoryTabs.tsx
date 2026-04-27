import { useRef, useState, useLayoutEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface TabItem {
  id: string;
  label: string;
  path?: string;
}

interface Props {
  items: TabItem[];
  selectedId: string;
  onClick: (item: TabItem) => void;
}

export default function CategoryTabs({
  items,
  selectedId,
  onClick,
}: Props) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 🔥 모바일이면 false, 태블릿/PC면 true
  const effectiveScrollable = !isMobile;

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const scroll = (dir: "left" | "right", amount = 500) => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    if (effectiveScrollable) checkScroll();
  }, [items, effectiveScrollable]);

  return (
    <div className="categoryWrapper">
      {/* 🔥 왼쪽 화살표 */}
      {effectiveScrollable && canScrollLeft && (
        <button className="arrow left" onClick={() => scroll("left")}>
          <i className="fas fa-chevron-left"></i>
        </button>
      )}

      {/* 🔥 탭 */}
      <div
        ref={scrollRef}
        className="categoryTabs"
        onScroll={effectiveScrollable ? checkScroll : undefined}
      >
        {items.map((item) => (
          <button
            key={item.id}
            className={selectedId === item.id ? "active" : ""}
            onClick={() => onClick(item)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 🔥 오른쪽 화살표 */}
      {effectiveScrollable && canScrollRight && (
        <button className="arrow right" onClick={() => scroll("right")}>
          <i className="fas fa-chevron-right"></i>
        </button>
      )}
    </div>
  );
}