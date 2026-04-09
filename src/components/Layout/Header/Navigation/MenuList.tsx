interface MenuItem {
  label: string;
  href: string;
  menuKey?: string;
}

interface MenuListProps {
  items: MenuItem[];
  className?: string;
  onItemClick?: (menuKey?: string) => void;
  activeKey?: string
}

export default function MenuList({
  items,
  className,
  activeKey,
  onItemClick
}: MenuListProps) {

  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            onClick={() => onItemClick?.(item.menuKey)}
            className={activeKey === item.menuKey ? "nav-selected" : ""}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}