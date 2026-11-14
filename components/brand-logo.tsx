import Image from "next/image";

const logoAlt = "O'zbekiston Yoshlar Diplomatiya Markazi logotipi";

export function BrandLogo({
  className = "",
  withPlate = false,
  priority = false,
}: {
  className?: string;
  withPlate?: boolean;
  priority?: boolean;
}) {
  const image = (
    <Image
      alt={logoAlt}
      className={`block w-auto object-contain ${className}`}
      height={274}
      priority={priority}
      sizes="(max-width: 767px) 80px, 180px"
      src="/images/logo.png"
      width={897}
    />
  );

  if (!withPlate) return image;

  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-white p-2.5 shadow-sm">
      {image}
    </span>
  );
}

export function BrandMark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={`block w-auto object-contain ${className}`}
      height={244}
      src="/images/logo-mark.png"
      width={439}
    />
  );
}
