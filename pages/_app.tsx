import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";
import { store } from "../src/state/StateController";
import Header from "../components/shared/SharedHeader/Header";
import Footer from "../components/shared/SharedFooter/Footer";
import { SocialLogin } from "../components/helpers/SocialLogin";
import { Toaster } from "react-hot-toast";
import SharedLoadingModal from "../components/shared/SharedLoadingModal/SharedLoadingModal";
import SharedHead from "../components/shared/SharedHead/SharedHead";
import "@splidejs/react-splide/css";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
    SocialLogin.initFirebase();
  }, []);

  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      
    } else {
      setMounted(true);
    }
  }, [isMounted]);

  if (!isMounted)
    return (
      <Provider store={store}>
        <SharedLoadingModal />{" "}
      </Provider>
    );

  return (
    <>
      <SharedHead />
      <Provider store={store}>
        <React.Fragment>
          <NextNProgress
            color="#ffbb38"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
            options={{ showSpinner: false }}
          />
          <Toaster />
          <Header />
          <div className="p-2 md:p-0">
            <Component {...pageProps} />
          </div>
          <Footer />
          <SharedLoadingModal />
        </React.Fragment>
      </Provider>
    </>
  );
}
