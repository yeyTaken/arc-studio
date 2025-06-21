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
};
