import { FaGithub } from "react-icons/fa";
import { MdCollectionsBookmark } from "react-icons/md";

import { siteConfig } from "../site";

export const itemsNotCompact: Record<string, NavItem> = {
  projects: {
    href: "/projects",
    label: "Projetos",
    icon: <MdCollectionsBookmark className="text-lg" />,
    position: "left",
  },
  github: {
    href: siteConfig.links.github,
    icon: <FaGithub className="text-lg" />,
    position: "right",
  },
};
