/** True when a reader or assistive technology can reach the element: not hidden, not aria-hidden, not removed from tab order. */
export function isExposed(el: Element): boolean {
  if (el.closest('[hidden], [aria-hidden="true"]')) return false;
  if (el.getAttribute("tabindex") === "-1") return false;
  return true;
}

export function accessibleName(el: Element): string {
  return (el.getAttribute("aria-label") ?? el.textContent ?? "").trim();
}
