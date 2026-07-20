import './globals.css';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'PrimePredict.co.ke - Premium Football Predictions',
  description: 'Get expert football predictions with high accuracy. Join thousands of successful bettors using PrimePredict.co.ke - Kenya\'s premier football prediction platform.',
  keywords: 'football predictions, betting tips, premier league predictions, over under, both teams to score, 1x2 predictions',
  openGraph: {
    title: 'PrimePredict.co.ke - Premium Football Predictions',
    description: 'Get expert football predictions with high accuracy winning rate',
    type: 'website',
    locale: 'en_KE',
    siteName: 'PrimePredict.co.ke',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrimePredict.co.ke - Premium Football Predictions',
    description: 'Get expert football predictions with high accuracy winning rate',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AuthProvider>
          <div className="page-wrapper">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

