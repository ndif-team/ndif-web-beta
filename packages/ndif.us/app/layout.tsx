import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import BackgroundCanvas from "components/BackgroundCanvas";
import { SettingsProvider } from "components/SettingsProvider";
import "styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "NSF | National Deep Inference Fabric",
  description: "Cracking open the mysteries inside large-scale Artificial Intelligence systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased selection:bg-accent-500 selection:text-white bg-white dark:bg-surface-950 text-slate-900 dark:text-slate-50 overflow-x-hidden`}>
        <SettingsProvider>
          <BackgroundCanvas />
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
