interface MenuItem<T> {
  label: string;
  menuKey: T;
  img?: string;
}

interface MenuListProps<T> {
  items: readonly MenuItem<T>[];
  className?: string;
  selectedMenu?: T;
  hoverMenu?: T;
  onItemClick?: (menuKey: T) => void;
  onItemHover?: (menuKey: T) => void;
}

export default function MenuList<T>({
  items,
  className,
  selectedMenu,
  onItemClick,
  onItemHover,
  hoverMenu,
}: MenuListProps<T>) {

  return (
    <ul className={className}>
      {items.map((item) => {
        const isActive =
          selectedMenu === item.menuKey ||
          hoverMenu === item.menuKey;

        return (
          <li key={item.label}>
            <button
              className={isActive ? "active" : ""}
              onMouseEnter={() => onItemHover?.(item.menuKey)}
              onClick={() => onItemClick?.(item.menuKey)}
            >
              {item.img && <img src={item.img} alt={item.label} />}
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}