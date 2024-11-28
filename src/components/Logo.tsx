import React from "react";
import LogoSvg from "../assets/logo.svg";

interface LogoProps {
  className?: string;
  size?: number | string;
  alt?: string;
}

export function Logo({
  className = "",
  size = 40,
  alt = "Application Logo",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`} data-oid="7rs246k">
      <img
        src={LogoSvg}
        alt={alt}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        loading="eager"
        data-oid="ibku9qf"
      />
    </div>
  );
}
