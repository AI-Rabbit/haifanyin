/**
 * Asset path utilities.
 *
 * For Vercel deployment the site is served at the domain root,
 * so no base-path prefixing is needed — just return the path as-is.
 */
export function getBasePath(): string {
  return "";
}

/** Prefix for files in /public — currently a no-op for root deployment. */
export function publicAsset(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}
