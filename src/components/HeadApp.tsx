import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import envConfig from '@/configs/environments';
import Script from 'next/script';

const langs = ['es', 'en', 'pt', 'fr'];

const HeadApp = (props: any) => {
  const {title, meta, code, page, section} = props;
  const [structuredData, setStructuredData] = useState<any>();
  const [canonical, setCanonical] = useState<any>();
  const [protocol, setProtocol] = useState('https');
  const [host, setHost] = useState('com');
  const [origin, setOrigin] = useState('com');
  const [gtag, setGtag] = useState('');

  useEffect(() => {
    if (typeof window != 'undefined') {
      setStructuredData({
        '@context': 'https://schema.org/',
        '@type': 'Hotel',
        name: title,
        alternateName: title,
        logo:
          section == 'home'
            ? `${window?.location.origin}/favicon.png`
            : `${window?.location.origin}/image/${code}?size=large&name=${meta?.meta_twitter?.image._id}`,
        telephone: '+351 296 298 887',
        url: window?.location?.href,
        image:
          section == 'home'
            ? `${window?.location.origin}/favicon.png`
            : `${window?.location.origin}/image/${code}?size=large&name=${meta?.meta_twitter?.image._id}`,
        starRating: {'@type': 'Rating', ratingValue: page?.stars},
        priceRange: '$100 - $300',
        address: {
          '@type': 'PostalAddress',
          streetAddress: page?.address?.street + ' ' + page?.address?.number,
          addressLocality: page?.address?.city,
          addressRegion: page?.address?.region,
          postalCode: page?.address?.postcode,
          addressCountry: page?.address?.country,
        },
        description: meta?.description,
      });
      setCanonical(
        window?.location?.pathname.length == 1
          ? window?.location?.origin + '/' + navigator.language.slice(0, 2)
          : window?.location?.href,
      );
      setHost(window?.location?.host);
      setProtocol(window?.location?.protocol);
      setOrigin(window?.location.origin);
      setGtag(`
          window?.dataLayer = window?.dataLayer || [];
          function gtag(){window?.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FYR0MGNXPX');
        `);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title} - Site Hotel</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" sizes="32x32" />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        {/**
         * Meta tags
         */}
        <meta name="description" content={meta?.meta_description} />
        <meta name="keywords" content={meta?.meta_keywords} />
        <meta name="author" content={title} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={
            canonical &&
            canonical?.slice(canonical.length - 1, canonical.length) == '/'
              ? canonical.slice(0, canonical.length - 1)
              : canonical
          }
        />
        <link
          rel="alternate"
          href={`${protocol}//${host}`}
          hrefLang={'x-default'}
        />
        {langs?.map((l: any, index: number) => (
          <link
            key={index}
            rel="alternate"
            href={`${protocol}//${host}/${l}`}
            hrefLang={l}
          />
        ))}
        <meta property="og:title" content={meta?.meta_twitter?.title} />
        <meta
          property="og:description"
          content={meta?.meta_twitter?.description}
        />
        <meta property="og:image" content="" />
        <meta name="twitter:title" content={meta?.meta_twitter?.title} />
        <meta
          name="twitter:description"
          content={meta?.meta_twitter?.description}
        />
        <meta
          name="twitter:image"
          content={
            section == 'home'
              ? `${origin}/favicon.png`
              : `${origin}/image/${code}?size=large&name=${meta?.meta_twitter?.image._id}`
          }
        />
        <meta
          name="twitter:card"
          content={
            section == 'home'
              ? `${origin}/favicon.png`
              : `${origin}/image/${code}?size=large&name=${meta?.meta_twitter?.image._id}`
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {section !== 'home' && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
          />
        )}
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-FYR0MGNXPX"></Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {gtag}
      </Script>
    </>
    // </html>
  );
};

export default HeadApp;
