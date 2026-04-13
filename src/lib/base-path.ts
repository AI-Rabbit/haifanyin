/**
 * GitHub Pages base path for static export.
 * - Project site: https://<user>.github.io/<repo>/ → "/<repo>"
 * - User/org site: repository named <user>.github.io is served at domain root → ""
 *
 * Set NEXT_PUBLIC_BASE_PATH in CI so client bundles match (see deploy workflow).
 * With `images.unoptimized`, next/image does not apply basePath to src (Next.js issue #68498);
 * use `publicAsset()` for public-folder images in client components.
 */
function normalizeBasePath(segment: string): string {
  if (!segment || segment === "/") return "";
  const p = segment.startsWith("/") ? segment : `/${segment}`;
  return p.replace(/\/$/, "") || "";
}

export function getBasePath(): string {
  const pub = process.env.NEXT_PUBLIC_BASE_PATH;
  if (typeof pub === "string") {
    return normalizeBasePath(pub);
  }
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  if (!repo) return "";
  if (/\.github\.io$/i.test(repo)) return "";
  return normalizeBasePath(`/${repo}`);
}

/** Prefix for files in /public when using next/image unoptimized + basePath. */
export function publicAsset(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${getBasePath()}${p}`;
}
