"use client"

import Image from "next/image"
import type { ReactNode } from "react"

export type CourseHeroShellProps = {
  imageSrc: string
  imageAlt: string
  imageClassName?: string
  imagePosition?: string
  children: ReactNode
}

export default function CourseHeroShell({
  imageSrc,
  imageAlt,
  imageClassName = "object-cover object-center",
  imagePosition,
  children,
}: CourseHeroShellProps) {
  return (
    <section className="eurekai-hero-section relative min-h-[min(68vh,560px)] overflow-hidden bg-[#0F172A] text-white md:min-h-[min(72vh,600px)] lg:min-h-[min(78vh,640px)]">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={imageClassName}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/78 to-[#0F172A]/30"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(108deg,rgba(2,6,23,0.55)_0%,rgba(2,6,23,0.18)_45%,transparent_70%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/35 via-transparent to-[#0F172A]/40"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(68vh,560px)] max-w-6xl flex-col justify-center px-6 pb-14 md:min-h-[min(72vh,600px)] lg:min-h-[min(78vh,640px)]">
        {children}
      </div>
    </section>
  )
}
