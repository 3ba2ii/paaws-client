import { smoothScroll } from './smoothScroll';

export const focusOnElement = async (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    smoothScroll(id);
    element.focus();
  }
};
