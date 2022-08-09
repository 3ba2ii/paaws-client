export function scrollToBottom(id: string) {
  const element = document.getElementById(id);

  if (element)
    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth',
    });
}
