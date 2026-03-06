export const smoothScrollTo = (elementId: string, offset: number = 64) => {
  const element = document.querySelector(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, offset: number = 64) => {
  e.preventDefault();
  smoothScrollTo(href, offset);
};

