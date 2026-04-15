import Image from "next/image";

/** Order matches `advantages.1` … `advantages.8` in messages (grid left-to-right, top then bottom). */
const ADVANTAGE_ICON_SRC = [
  "/icons/lightweight-compact.png",
  "/icons/modern-design.png",
  "/icons/quick-setup.png",
  "/icons/all-season-use.png",
  "/icons/autonomous.png",
  "/icons/quality-materials.png",
  "/icons/easy-storage.png",
  "/icons/versatile.png",
] as const;

export function AdvantageIcon({ index }: { index: number }) {
  const src = ADVANTAGE_ICON_SRC[index];
  if (src === undefined) return null;

  return (
    <Image
      src={src}
      alt=""
      width={96}
      height={96}
      className="h-24 w-24 object-contain select-none"
      sizes="96px"
      draggable={false}
    />
  );
}
