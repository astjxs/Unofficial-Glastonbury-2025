
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Glastonbury 2025 Schedule Planner',
  description: 'Plan your perfect Glastonbury experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}
