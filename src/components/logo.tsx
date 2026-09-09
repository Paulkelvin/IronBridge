import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <Image
        src="/brand/shield-mark.png"
        alt="Iron Bridge Mobility Solutions"
        width={40}
        height={41}
        className="h-9 w-auto"
        priority
      />
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-[15px] font-semibold tracking-tight text-navy">
          IRON BRIDGE
        </span>
        <span className="text-[9px] font-medium tracking-[0.18em] text-teal uppercase">
          Mobility Solutions
        </span>
      </span>
    </span>
  );
}
