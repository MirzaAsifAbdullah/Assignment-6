import "./globals.css";

import { FitLogProvider } from "@/context/FitLogContext";

export const metadata = {
  title: "FitLog — Workout ",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>{children}</FitLogProvider>
      </body>
    </html>
  );
}