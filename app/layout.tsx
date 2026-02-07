import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deriv Compliance Copilot - AI-Powered KYC Automation',
  description: 'Automate regulatory compliance for Deriv traders across 5 jurisdictions. Turn 2,000 weekly alerts into 50 high-confidence cases.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
