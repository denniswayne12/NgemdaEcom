import "./globals.css"

export const metadata = {
  title: 'My E-commerce',
  description: 'Modern e-commerce platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Use Inter from Google Fonts CDN */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}