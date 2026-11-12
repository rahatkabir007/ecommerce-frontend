const API_BASE = process.env.NEXT_PUBLIC_API_ENDPOINT?.replace(/\/$/, "");

/** Normalize product/category/slider image values from the API for use in img src / CSS url(). */
export function resolveMediaUrl(
  value?: string | string[] | null
): string {
  if (value == null) return "";

  const raw = Array.isArray(value) ? value.find(Boolean) : value;
  if (!raw || typeof raw !== "string") return "";

  const trimmed = raw.trim();
  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }

  if (trimmed.startsWith("/") && API_BASE) {
    return `${API_BASE}${trimmed}`;
  }

  if (API_BASE) {
    return `${API_BASE}/uploads/${trimmed.replace(/^\/+/, "")}`;
  }

  return trimmed;
}

export function productImageUrl(
  imageURL?: string | string[] | null
): string {
  return resolveMediaUrl(imageURL);
}
