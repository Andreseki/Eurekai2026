import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Inter } from 'next/font/google'
import { SiteModalsProvider } from '@/components/site-modals-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400','500','600','700','800'],
  display: 'swap',
  variable: '--font-sans',
})

const siteUrl = 'https://www.eurekai.es'
const ogImageUrl = `${siteUrl}/og-image.png`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'EurekAI',
    template: '%s · EurekAI',
  },
  description:
    'Innovación, IA e impacto: experiencias formativas para líderes y equipos que quieren resultados en tiempo récord.',
  openGraph: {
    title: 'EurekAI',
    description:
      'Innovación, IA e impacto: experiencias formativas para líderes y equipos que quieren resultados en tiempo récord.',
    url: `${siteUrl}/`,
    siteName: 'EurekAI',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Logo oficial de EurekAI',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EurekAI',
    description:
      'Innovación, IA e impacto: experiencias formativas para líderes y equipos que quieren resultados en tiempo récord.',
    images: [ogImageUrl],
  },
  other: {
    'og:image': ogImageUrl,
    'og:image:secure_url': ogImageUrl,
    'twitter:image': ogImageUrl,
  },
  icons: {
    icon: '/placeholder-logo.png',
    shortcut: '/placeholder-logo.png',
    apple: '/placeholder-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <SiteModalsProvider>{children}</SiteModalsProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
