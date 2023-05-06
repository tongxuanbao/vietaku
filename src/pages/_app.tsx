import { type AppType, type AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { viVN } from "~/utils/vi-VN";
import { dark } from "@clerk/themes";
import Layout from "~/components/Layout";

const standalonePages = ["/sign-in", "/sign-up"];

const clerkAppearance = {
  baseTheme: dark,
  elements: {
    card: "bg-zinc-800",
  },
};

const MyApp: AppType = ({ Component, pageProps, ...appProps }: AppProps) => {
  return (
    <ClerkProvider
      appearance={clerkAppearance}
      localization={viVN}
      {...pageProps}
    >
      {standalonePages.includes(appProps.router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
