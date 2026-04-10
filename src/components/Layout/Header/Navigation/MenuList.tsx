interface MenuItem<T> {
  label: string;
  menuKey: T;
}

interface MenuListProps<T> {
  items: MenuItem<T>[];
  className?: string;
  selectedKey?: T;
  onItemClick?: (menuKey: T) => void;
}

export default function MenuList<T>({
  items,
  className,
  selectedKey,
  onItemClick
}: MenuListProps<T>) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.label}>
          <button onClick={() => onItemClick?.(item.menuKey)}>{item.label}</button>
        </li>
      ))}
    </ul>
  );
}