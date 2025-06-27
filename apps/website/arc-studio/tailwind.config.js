import { heroui } from "@heroui/react";

export default {
  content: ["node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    heroui({ defaultTheme: "dark" }),
  ],
};
