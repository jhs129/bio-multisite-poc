import App from 'next/app';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import '@/styles/globals.css'; // Always load global styles

export default function MyApp({ Component, pageProps, siteKey }) {

  useEffect(() => {
    document.body.className = siteKey; // Dynamically set class
  }, [siteKey]);

  return (
      <Component {...pageProps}/>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const req = appContext.ctx.req;

  const hostname = req.headers.host

  const domainMap = {
    'site1.com': 'site1',
    'site2.com': 'site2',
    'localhost:3000': 'site1', // Local development
  };

  let siteKey = domainMap[hostname] || "site1";

  return { ...appProps, siteKey};
};
