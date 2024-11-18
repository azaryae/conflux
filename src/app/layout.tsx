import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./app";
import "./global.css";
// import AuthProvider from "@/provider/auth.provider";
import NextAuthSessionProvider from './providers/sessionProvider';



export const metadata = {
  title: "Conflux.AI Main Demo",
  description: "Conflux.AI Main kit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* <AuthProvider> */}
          <Providers>
            <NextAuthSessionProvider>
              <MyApp>{children}</MyApp>
            </NextAuthSessionProvider>
          </Providers>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
