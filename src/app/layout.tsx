import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar, Footer, BackToTop } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NİLBATU - Profesyonel Organizasyon Hizmetleri',
  description: 'Profesyonel organizasyon hizmetleri ile etkinliklerinizi unutulmaz kılıyoruz. Kaliteli ekipman ve uzman ekibimizle hizmetinizdeyiz.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body className={inter.className}>
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
