import { type AppType, type AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { viVN } from "~/utils/vi-VN";
import Navbar from "~/components/Navbar";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider localization={viVN} {...pageProps}>
      <Navbar />
      <main className="bg-grey-900 flex min-h-screen flex-col items-center justify-center">
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
