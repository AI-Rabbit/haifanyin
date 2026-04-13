/**
 * GitHub Pages base path for static export.
 * - Project site: https://<user>.github.io/<repo>/ → "/<repo>"
 * - User/org site: repository named <user>.github.io is served at domain root → ""
 *
 * In GitHub Actions, GITHUB_REPOSITORY is "owner/repo". Locally it is unset → "".
 */
export function getBasePath(): string {
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  if (!repo) return "";
  if (/\.github\.io$/i.test(repo)) return "";
  return `/${repo}`;
}
