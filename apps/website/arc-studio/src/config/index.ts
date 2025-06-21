export * from "./projects";

import { itemsCompact } from "./navItems/compact";
import { itemsNotCompact } from "./navItems/index";

export const items: NavbarItems = {
  isCompact: itemsCompact,
  notCompact: itemsNotCompact,
};
