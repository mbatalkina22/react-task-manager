import "./globals.css"
import { Raleway, Quicksand } from 'next/font/google';


const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html  lang="en" data-mode="light" className={`${raleway.className} ${quicksand.className}`}>
      <body>{children}</body>
    </html>
  );
}
