import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Registro Usuarios con Next js',
  description: 'Este un formulario de registro con next y tailwind css',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='mt-10 mb-10'>{children}</body>
    </html>
  )
}
