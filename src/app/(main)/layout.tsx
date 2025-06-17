import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sphere mesh",
  description: "Sphere mesh© social website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
