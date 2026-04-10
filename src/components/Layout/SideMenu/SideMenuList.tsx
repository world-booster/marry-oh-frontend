interface MenuItem {
  label: string;
  href: string;
}

interface SideMenuListProps {
  items: MenuItem[];
  className?: string;
  onItemClick?: (menuKey?: string) => void;
  activeKey?: string
}

export default function SideMenuList({
  items,
  className,
  onItemClick
}: SideMenuListProps) {

  return (
    <nav>
      <ul className={className}>
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} onClick={() => onItemClick?.(item.href)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}