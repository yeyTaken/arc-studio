import { siteConfig } from "@/config/site";
import { CgWebsite } from "react-icons/cg";
import { FaGithub, FaUserShield } from "react-icons/fa6";
import { GrDocumentConfig, GrGamepad } from "react-icons/gr";
import { LuBot } from "react-icons/lu";
import {
  MdCollectionsBookmark,
  MdOutlineWorkspacePremium,
} from "react-icons/md";

export const itemsCompact: Record<string, NavItemBase> = {
  projects: {
    href: "/projects",
    label: "Projetos",
    icon: <MdCollectionsBookmark className="text-lg" />,
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
