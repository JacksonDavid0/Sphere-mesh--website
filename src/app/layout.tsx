import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sphere mesh",
  description: "Sphere mesh© social website",
};
import "../../public/css/index.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
