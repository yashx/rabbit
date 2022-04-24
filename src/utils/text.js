export function htmlUnencode(inp) {
  const parsed = new DOMParser().parseFromString(inp, "text/html");
  return parsed.documentElement.textContent;
}
