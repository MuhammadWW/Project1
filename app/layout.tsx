import './globals.css';

export const metadata = {
  title: 'Convolution Lab',
  description: 'Interactive visual convolution tutor for Signals and Systems',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
