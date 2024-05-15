import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import { controller, store } from "../src/state/StateController";
import Header from "../components/shared/SharedHeader/Header";
import Footer from "../components/shared/SharedFooter/Footer";
import { EcommerceApi } from "../src/API/EcommerceApi";
import { SocialLogin } from "../components/helpers/SocialLogin";

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

  return (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </React.Fragment>
    </Provider>
  );
}
