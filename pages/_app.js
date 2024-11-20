import App from 'next/app';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import '@/styles/globals.css'; // Always load global styles

export default function MyApp({ Component, pageProps, siteKey }) {
  const [currentSiteKey, setCurrentSiteKey] = useState(siteKey);

  // Handle client-side updates for siteKey
  useEffect(() => {
    if (!currentSiteKey && typeof window !== 'undefined') {
      const savedSiteKey = localStorage.getItem('siteKey');
      setCurrentSiteKey(savedSiteKey);
    }
  }, [currentSiteKey]);

  // Save siteKey for client-side navigation
  useEffect(() => {
    if (currentSiteKey) {
      localStorage.setItem('siteKey', currentSiteKey);
    }
  }, [currentSiteKey]);

  return (
    <>
      <Head>
        {/* Dynamically add site-specific styles */}
        {currentSiteKey && (
          <link
            rel="stylesheet"
            href={`/styles/${currentSiteKey}.css`}
            key="site-specific-styles"
          />
        )}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

// Fetch `x-site-key` during server-side rendering
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const req = appContext.ctx.req;

  // Read `x-site-key` header set by middleware
//  const siteKey = req ? req.headers['x-site-key'] : null;
  const siteKey = "site1";
  return { ...appProps, siteKey };
};
