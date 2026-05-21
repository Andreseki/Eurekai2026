"use client"

import Image from "next/image"
import Link from "next/link"

const WHATSAPP_HREF =
  "https://wa.me/573150564078?text=Hola%20EurekAI,%20quiero%20informacion"

export default function WhatsAppFloat() {
  return (
    <Link
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noreferrer noopener"
      className="fixed right-4 z-[90] inline-flex items-center justify-center rounded-full bg-[#fd7914] p-4 text-white shadow-2xl shadow-slate-950/35 transition hover:bg-[#e26b0e] md:right-6"
      style={{ bottom: "calc(var(--promo-bar-height, 80px) + 1.25rem + env(safe-area-inset-bottom, 0px))" }}
      aria-label="Escríbenos por WhatsApp"
    >
      <Image src="/whatsapp.svg" alt="" width={28} height={28} className="h-7 w-7" />
    </Link>
  )
}
