import { siteConfig } from "@/config/site";
import { FaGithub, FaUserShield } from "react-icons/fa6";
import { MdCollectionsBookmark, MdOutlineWorkspacePremium } from "react-icons/md";

export const itemsCompact: Record<string, NavItemBase> = {
  projects: {
    href: "/projects",
    label: "Projetos",
    icon: <MdCollectionsBookmark className="text-lg" />,
  },
  services: {
    href: "/services",
    label: "Serviços",
    icon: <MdOutlineWorkspacePremium className="text-lg" />
  },
  team: {
    href: "/team",
    icon: <FaUserShield className="text-lg" />
  },
  github: {
    href: siteConfig.links.github,
    icon: <FaGithub className="text-lg" />,
  },
};
