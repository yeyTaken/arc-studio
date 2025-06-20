interface NavItem {
  href: string;
  label?: string;
  icon?: React.ReactNode;
  position?: "left" | "right";
}

interface NavItemCompact {
  href: string;
  label?: string;
  icon?: React.ReactNode;
}

interface NavbarItems {
  isCompact: Record<string, NavItemCompact>;
  notCompact: Record<string, NavItem>;
}
