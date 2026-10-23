/**
 * Adsterra Native Banner (NativeBanner_1). Same zone key as the live unit.
 * Get Code is an inline script immediately before the container. Next's
 * Script component moves that tag to the end of body, so this slot emits
 * the tag as HTML. Do not rebuild the URL as
 * `profitableratecpmnetwork.com/<zone>/invoke.js`.
 */
const SCRIPT_SRC = "https://bauval.org/21/7ce9f3df7fcc25515e7ea19bfa04f515";
const CONTAINER_ID = "container-7ce9f3df7fcc25515e7ea19bfa04f515";

export function AdBanner() {
  return (
    <div
      className="my-8"
      dangerouslySetInnerHTML={{
        __html: `<script async="async" data-cfasync="false" src="${SCRIPT_SRC}"></script><div id="${CONTAINER_ID}"></div>`,
      }}
    />
  );
}
