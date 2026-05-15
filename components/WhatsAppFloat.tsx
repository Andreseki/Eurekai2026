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
      className="fixed bottom-4 right-4 z-[90] inline-flex items-center justify-center rounded-full bg-[#fd7914] p-4 text-white shadow-2xl shadow-slate-950/35 transition hover:bg-[#e26b0e] md:bottom-6 md:right-6"
      aria-label="Escríbenos por WhatsApp"
    >
      <Image src="/whatsapp.svg" alt="" width={28} height={28} className="h-7 w-7" />
    </Link>
  )
}
