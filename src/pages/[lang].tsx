import envConfig from '@/configs/environments';
import React from 'react';
import dynamic from 'next/dynamic';

const Lang = ({store, data, typeFetch}: any) => {
  const Layout = dynamic(() => import('../layouts/hotel/hotel'), {ssr: false});
  const Home = dynamic(() => import('../layouts/home/home'), {ssr: false});

  return (
    <>
      {typeFetch === 'hotel' ? <Layout store={store} /> : <Home data={data} />}
    </>
  );
};

export async function getServerSideProps(context: any) {
  const {req, query} = context;
  const lang = query.lang?.toUpperCase() || 'EN';
  console.log(lang);
  const hostname = req.headers.host;
  const hotel = hostname.split('.')[0];

  let typeFetch = null;
  let data = null;
  let store = null;

  if (
    !hotel?.includes('localhost') &&
    hotel !== 'localhost:3000' &&
    hotel !== `com-${envConfig.portal}` &&
    !hotel?.includes(`com-${envConfig.portal}`)
  ) {
    typeFetch = 'hotel';
    try {
      const res = await fetch(
        `${envConfig.api}hotel/${hotel}/${lang}?location=${envConfig.portal}`,
      );
      const result = await res.json();

      if (result?.payload?.page && hotel !== 'www') {
        store = result.payload;
      } else if (result.redirect) {
        return {
          redirect: {
            destination: `https://${result.redirect}`,
            permanent: false,
          },
        };
      } else {
        return {
          redirect: {
            destination: `https://${result?.payload?.code}.${hostname.slice(
              hostname.indexOf('.') + 1,
            )}`,
            permanent: false,
          },
        };
      }
    } catch (e) {
      console.log('Error obtaining hotel', e);
    }
  } else {
    typeFetch = 'home';
    try {
      const res = await fetch(
        `${envConfig.api}hotel/home/${lang}?location=${envConfig.portal}`,
      );
      data = await res.json();
    } catch (e) {
      console.log('Error obtaining hotel', e);
    }
  }

  return {
    props: {
      store,
      data,
      typeFetch,
      lang: lang.toLowerCase(),
    },
  };
}

export default Lang;
