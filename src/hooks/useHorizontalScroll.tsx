import { useRef, useState, useLayoutEffect, useCallback } from "react";

export const useHorizontalScroll = (deps: any[] = []) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);



  const checkScroll = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    const { scrollLeft, scrollWidth, clientWidth } = element;

    const nextLeft = scrollLeft > 0;
    const nextRight = scrollLeft + clientWidth < scrollWidth - 1;

    setCanScrollLeft(prev => (prev !== nextLeft ? nextLeft : prev));
    setCanScrollRight(prev => (prev !== nextRight ? nextRight : prev));
  }, []);



  const scroll = useCallback((dir: "left" | "right", amount = 500) => {
    const element = scrollRef.current;
    if (!element) return;

    element.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);



  useLayoutEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    checkScroll();

    element.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      element.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, ...deps]);

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scroll,
  };
};