import type { ReactNode } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { NProgress } from "@/components/nprogress";
import { Layout as RootLayout } from "../layout/root";

// google fonts
import { Open_Sans as openSansFunc } from "next/font/google";

export const dynamic = "force-dynamic";

// fonts
const openSans = openSansFunc({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Personnel Library",
  description: "The Mega-mart of technology",
  viewport: "initial-scale=1, width=device-width",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: {
      rel: "apple-touch-icon.png",
      url: "/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
};

const SETTINGS_STORAGE_KEY = "app.settings";

const restoreSettings = (): Settings | undefined => {
  const cookieList = cookies();

  let value: Settings | undefined;

  if (cookieList.has(SETTINGS_STORAGE_KEY)) {
    try {
      const restored = cookieList.get(SETTINGS_STORAGE_KEY);

      if (restored) {
        value = JSON.parse(restored.value) as Settings | undefined;
      }
    } catch (err) {}
  }

  return value;
};

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;

  const settings = restoreSettings();

  return (
    <html lang="en">
      <body className={`${openSans.className}`}>
        <RootLayout settings={settings}>
          {children} <NProgress />
        </RootLayout>
      </body>
    </html>
  );
}

export default Layout;
