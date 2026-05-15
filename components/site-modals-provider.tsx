"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import ModalContacto from "@/components/ModalContacto"
import { GOOGLE_BOOKING_URL } from "@/lib/site-config"

type SiteModalsContextValue = {
  openContact: () => void
  openAgenda: () => void
  closeContact: () => void
  closeAgenda: () => void
}

const SiteModalsContext = createContext<SiteModalsContextValue | null>(null)

export function useSiteModals() {
  const ctx = useContext(SiteModalsContext)
  if (!ctx) {
    throw new Error("useSiteModals debe usarse dentro de SiteModalsProvider")
  }
  return ctx
}

export function SiteModalsProvider({ children }: { children: ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false)

  const openContact = useCallback(() => setContactOpen(true), [])
  const openAgenda = useCallback(() => {
    if (typeof window !== "undefined") {
      window.open(GOOGLE_BOOKING_URL, "_blank", "noopener,noreferrer")
    }
  }, [])
  const closeContact = useCallback(() => setContactOpen(false), [])
  const closeAgenda = useCallback(() => {}, [])

  const value = useMemo(
    () => ({
      openContact,
      openAgenda,
      closeContact,
      closeAgenda,
    }),
    [openContact, openAgenda, closeContact, closeAgenda],
  )

  return (
    <SiteModalsContext.Provider value={value}>
      {children}
      <ModalContacto open={contactOpen} onClose={closeContact} />
    </SiteModalsContext.Provider>
  )
}
