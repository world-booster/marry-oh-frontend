interface MenuItem<T> {
  label: string;
  menuKey: T;
  img?: string
}

interface MenuListProps<T> {
  items: readonly MenuItem<T>[];
  className?: string;
  selectedMenu?: T;
  onItemClick?: (menuKey: T) => void;
}


export default function MenuList<T>({
  items,
  className,
  selectedMenu,
  onItemClick
}: MenuListProps<T>) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.label}>
          <button
            className={selectedMenu === item.menuKey ? "active" : ""}
            onClick={() => onItemClick?.(item.menuKey)}>

            {item.img && (
              <img src={item.img} alt={item.label} />
            )}

            {item.label}

          </button>
        </li>
      ))}
    </ul>
  );
}