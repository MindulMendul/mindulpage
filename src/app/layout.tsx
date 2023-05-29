import './globals.css'
import { Inter } from 'next/font/google'
import Header from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mindul Page',
  description: 'the Page of Mindul',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      
      <body className={inter.className}>
      <Header />
      {children}
      </body>
    </html>
  )
}
