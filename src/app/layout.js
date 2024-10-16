import { ThirdwebProvider } from "thirdweb/react";
import localFont from "next/font/local";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThirdwebProvider>
      <body
        
      >
        {children}
      </body>
      </ThirdwebProvider>
    </html>
  );
}
