export function userIsNearBottom() {
  const result =
    window.innerHeight + window.scrollY >= document.body.scrollHeight &&
    window.oldScroll < window.scrollY;
  window.oldScroll = window.scrollY;
  return result;
}
