import { FaGithub, FaUserShield } from "react-icons/fa";
import {
  MdCollectionsBookmark,
  MdOutlineWorkspacePremium,
} from "react-icons/md";

import { siteConfig } from "../site";
import { LuBot } from "react-icons/lu";
import { CgWebsite } from "react-icons/cg";
import { GrDocumentConfig, GrGamepad } from "react-icons/gr";

export const itemsNotCompact: Record<string, NavItem> = {
  projects: {
    href: "/projects",
    label: "Projetos",
    icon: <MdCollectionsBookmark className="text-lg" />
  },
  services: {
    label: "Serviços",
    icon: <MdOutlineWorkspacePremium className="text-lg" />,
    children: {
      bot: {
        href: "/services/bot",
        label: "Bot",
        icon: <LuBot className="text-lg" />,
      },
      web: {
        href: "/services/website",
        label: "Website",
        icon: <CgWebsite className="text-lg" />,
      },
      game: {
        href: "/services/game",
        label: "Jogos",
        icon: <GrGamepad className="text-lg" />,
      },
      custom: {
        href: "/services/custom",
        label: "Customizado",
        icon: <GrDocumentConfig className="text-lg" />,
      },
    },
  },
  team: {
    href: "/team",
    icon: <FaUserShield className="text-lg" />,
  },
  github: {
    href: siteConfig.links.github,
    icon: <FaGithub className="text-lg" />,
  },
};
