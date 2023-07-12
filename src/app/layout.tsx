import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  // title: 'Mindul Page',
  // description: 'the Page for Mindul`s portfolio',
  openGraph: {
    title: 'Mindul Page',
    description: 'the Page for Mindul`s portfolio',
    url: 'https://mindulpage.vercel.app/',
    siteName: 'Mindul Page',
    images: [
      {
        url: '/img/meta.png',
        width: 804,
        height: 804,
      },
    ],
    locale: 'kr',
    type: 'website',
  }
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
