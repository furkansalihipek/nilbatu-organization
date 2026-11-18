import type { Metadata } from 'next'
import './globals.css'
import { Navbar, Footer, BackToTop } from '@/components'

export const metadata: Metadata = {
  title: 'NİLBATU - Profesyonel Organizasyon Hizmetleri',
  description: 'Profesyonel organizasyon hizmetleri ile etkinliklerinizi unutulmaz kılıyoruz. Kaliteli ekipman ve uzman ekibimizle hizmetinizdeyiz.',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body className="font-sans">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </div>
      </body>
    </html>
  )
}
