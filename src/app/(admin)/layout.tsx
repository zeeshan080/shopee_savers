import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shopee Savers - Admin',
  description: 'Shopee Savers - Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex items-start">
        <Sidebar />
        <section className="w-full flex flex-col">
          <Header />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </section>
      </body>
    </html>
  )
}
