import { Lexend } from 'next/font/google';
import './globals.css';
import AppThemeProvider from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { DarkModeProvider } from '@/context/DarkModeContext';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-lexend',
});

export const metadata = {
  title: {
    default: 'BoardIQ | Business Intelligence Dashboard',
    template: '%s | BoardIQ'
  },
  description: 'Powerful yet simple BI tool with real-time analytics, data visualization, and actionable insights for data-driven decision making.',
  keywords: [
    'business intelligence',
    'data visualization',
    'analytics dashboard',
    'BI tool',
    'data analytics',
    'business metrics',
    'KPI dashboard'
  ],
  authors: [{ name: 'BoardIQ' }],
  openGraph: {
    title: 'BoardIQ | Modern Business Intelligence Platform',
    description: 'Transform raw data into actionable insights with our intuitive BI dashboard',
    url: 'https://boardiq.vercel.app',
    siteName: 'BoardIQ',
    images: [
      {
        url: 'https://boardiq.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BoardIQ | Business Intelligence Dashboard',
    description: 'Real-time analytics and data visualization for your business',
    images: ['https://boardiq.vercel.app/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lexend.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data for BI Tool */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "BoardIQ",
            "description": "Business Intelligence dashboard with real-time analytics",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </head>
      <body className="font-sans bg-gray-50">
        <DarkModeProvider>
          <AppThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </AppThemeProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}