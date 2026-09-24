import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { BookingModal } from "@/components/booking/BookingModal";
import { WhatsAppModal } from "@/components/booking/WhatsAppModal";
import { CostEstimatorModal } from "@/components/estimator/CostEstimatorModal";
import { TimedEstimatePopup } from "@/components/estimator/TimedEstimatePopup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dainterior.in"),
  title: "DA Interiors | Bespoke Architecture & Luxury Living",
  description: "Curating timeless architectural sanctuaries, private penthouses, and bespoke residential spaces with refined natural materials and turnkey precision.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <BookingProvider>
          {children}
          <BookingModal />
          <WhatsAppModal />
          <CostEstimatorModal />
          <TimedEstimatePopup />
        </BookingProvider>
      </body>
    </html>
  );
}
