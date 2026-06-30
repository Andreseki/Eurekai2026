"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import ModalAgenda from "@/components/ModalAgenda"
import ModalContacto from "@/components/ModalContacto"
import WhatsAppFloat from "@/components/WhatsAppFloat"

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
  const [agendaOpen, setAgendaOpen] = useState(false)

  const openContact = useCallback(() => setContactOpen(true), [])
  const openAgenda = useCallback(() => setAgendaOpen(true), [])
  const closeContact = useCallback(() => setContactOpen(false), [])
  const closeAgenda = useCallback(() => setAgendaOpen(false), [])

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
      <WhatsAppFloat />
      <ModalContacto open={contactOpen} onClose={closeContact} />
      <ModalAgenda open={agendaOpen} onClose={closeAgenda} />
    </SiteModalsContext.Provider>
  )
}
