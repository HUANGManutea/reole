import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PageContainer from './components/page-container'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reole',
  description: 'Wordle Reo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageContainer>
          {children}
        </PageContainer>
      </body>
    </html>
  )
}
