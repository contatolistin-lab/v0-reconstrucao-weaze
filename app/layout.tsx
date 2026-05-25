import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({ 
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WEAZE - Plataforma de Comunidades White-Label',
  description: 'Crie comunidades engajadas para sua marca. Feed estilo TikTok, gamificação, grupos e eventos. Tudo com sua identidade visual.',
  keywords: ['comunidade', 'white-label', 'engajamento', 'gamificação', 'feed', 'marca'],
  authors: [{ name: 'WEAZE' }],
  openGraph: {
    title: 'WEAZE - Sua Comunidade, Sua Marca',
    description: 'Plataforma completa para criar comunidades engajadas com feed vertical, gamificação e eventos.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8b5cf6' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1625' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable} bg-background`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Weaze" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
