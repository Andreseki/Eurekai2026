/** WhatsApp EurekAI (Colombia +57). */
export const WHATSAPP_PHONE_E164 = "573115275095"

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(text)}`
}

/** Checkout bootcamp (Wompi). */
export const WOMPI_CHECKOUT_URL = "https://checkout.wompi.co/l/P9hY3x"

/** Reservas (Google Calendar booking). */
export const GOOGLE_BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3eovVMkn9wK5aXUAztO2V13MJzu8_4BxIPor0VFv2Wa_xxbB5IAT6a-wKcbZ1iO0uVwZKntl71"

/** Bandeja de entrada para formularios (CONTACT_EMAIL_TO en .env.local para pruebas). */
export const CONTACT_INBOX_EMAIL =
  process.env.CONTACT_EMAIL_TO ?? "info@eurekai.es"
