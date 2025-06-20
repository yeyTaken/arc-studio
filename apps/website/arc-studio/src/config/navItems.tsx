import { FaGithub } from "react-icons/fa";
import { MdCollectionsBookmark } from "react-icons/md";

import { siteConfig } from "./site";



export const items: NavbarItems = {
  isCompact: {
    projects: {
      href: "/projects",
      label: "Projetos",
      icon: <MdCollectionsBookmark />,
    },
  },
  notCompact: {
    projects: {
      href: "/projects",
      label: "Projetos",
      icon: <MdCollectionsBookmark className="text-lg" />,
      position: "left",
    },
    github: {
      href: siteConfig.links.github,
      icon: <FaGithub className="text-lg" />,
    },
  },
};
