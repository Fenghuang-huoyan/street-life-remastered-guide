import Script from "next/script";

const SCRIPT_SRC = process.env.NEXT_PUBLIC_ADSTERRA_SCRIPT_SRC;
const CONTAINER_ID = process.env.NEXT_PUBLIC_ADSTERRA_CONTAINER_ID;

/** Adsterra Native Banner。两个环境变量任一没配就不渲染，本地开发不受影响。 */
export function AdBanner() {
  if (!SCRIPT_SRC || !CONTAINER_ID) return null;
  return (
    <div className="my-8">
      <Script async data-cfasync="false" src={SCRIPT_SRC} strategy="afterInteractive" />
      <div id={CONTAINER_ID} />
    </div>
  );
}
