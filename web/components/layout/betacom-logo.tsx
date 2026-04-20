import Image from "next/image";

export function BetacomLogo({ size = 32 }: { size?: number }) {
  return (
    <Image
      src="/betacomlogo.png"
      alt="Betacom"
      width={size}
      height={size}
      priority
      className="rounded-md"
    />
  );
}
