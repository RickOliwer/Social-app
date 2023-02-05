import "@/styles/globals.css";
import "@/styles/global.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

import { AuthContextProvider } from "@/components/context/authContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </>
  );
}
