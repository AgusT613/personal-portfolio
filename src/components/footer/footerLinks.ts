export interface FooterLink {
  href: string;
  icon: string;
  label: string;
}

export const FOOTER_LINKS: FooterLink[] = [
  {
    href: "mailto:torresagustin613@gmail.com",
    icon: "logos:google-gmail",
    label: "Gmail",
  },
  {
    href: "https://www.linkedin.com/in/torres-facundo-agustin",
    icon: "logos:linkedin-icon",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/AgusT613",
    icon: "tabler:brand-github",
    label: "GitHub",
  },
];

export default FOOTER_LINKS;
