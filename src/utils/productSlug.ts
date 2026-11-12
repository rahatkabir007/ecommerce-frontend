/** Slugs may contain literal '+'; unencoded query strings decode '+' as space. */
export function normalizeProductSlug(
  slug?: string | string[] | null
): string {
  const raw = Array.isArray(slug) ? slug[0] : slug;
  if (!raw) return "";
  return raw.replace(/ (?=_)/g, "+");
}
