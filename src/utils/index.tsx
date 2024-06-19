import { Theme } from "@/pages";

export function themeClassModifier(currentTheme: Theme, type?: number): string {
  if (currentTheme === "Dark Mode") {
    if (type && type === 1) {
      return "section_dark dark";
    } else {
      return "container_dark dark";
    }
  } else {
    if (type && type === 1) {
      return "section_light light";
    } else {
      return "container_light light";
    }
  }
}
