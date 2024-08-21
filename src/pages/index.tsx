import {useEffect, useState} from 'react';
import envConfig from '@/configs/environments';
import dynamic from 'next/dynamic';
import {GetServerSideProps} from 'next';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  res.setHeader(
    'Set-Cookie',
    'cookieName=cookieValue; Path=/; HttpOnly; SameSite=Lax',
  );

  const subdomain = req?.headers?.host?.split('.')[0];
  const langQuery = query?.lang as string;
  let data: any = null;
  let typeFetch: string = '';

  const lang = langQuery ? langQuery.toUpperCase() : 'ES';

  const apiUrl =
    subdomain &&
    !subdomain.includes('localhost') &&
    subdomain !== 'localhost:3000' &&
    !subdomain.includes(`com-${envConfig.portal}`)
      ? `${envConfig.api}hotel/${subdomain}/${lang}?location=${envConfig.portal}`
      : `${envConfig.api}hotel/home/${lang}?location=${envConfig.portal}`;

  try {
    const result = await fetch(apiUrl);
    const responseData = await result.json();

    data = responseData;
    typeFetch =
      subdomain &&
      !subdomain.includes('localhost') &&
      subdomain !== 'localhost:3000' &&
      !subdomain.includes(`com-${envConfig.portal}`)
        ? 'hotel'
        : 'home';
  } catch (e: any) {
    console.log(e);
    data = {error: 'error'};
    typeFetch = 'error';
  }

  return {
    props: {
      store: data,
      typeFetch,
    },
  };
};

export default function Home({store}: any) {
  const Layout = dynamic(() => import('../layouts/hotel/hotel'), {ssr: false});
  const Home = dynamic(() => import('../layouts/home/home'), {ssr: false});

  const [data, setData] = useState<any>(store);
  const [typeFetch, setTypeFetch] = useState<any>(null);

  useEffect(() => {
    if (typeof window != 'undefined') {
      const hotel = window.location.hostname.split('.')[0];
      if (
        !hotel?.includes('localhost') &&
        hotel !== 'localhost:3000' &&
        hotel !== `com-${envConfig.portal}` &&
        !hotel?.includes(`com-${envConfig.portal}`)
      ) {
        setTypeFetch('hotel');
      } else setTypeFetch('home');
    }
  }, []);

  const getHotel = async () => {
    const hotel = window.location.hostname.split('.')[0];
    if (
      !hotel?.includes('localhost') &&
      hotel !== 'localhost:3000' &&
      hotel !== `com-${envConfig.portal}` &&
      !hotel?.includes(`com-${envConfig.portal}`)
    ) {
      try {
        setTypeFetch('hotel');
        const lang: any = navigator?.language?.slice(0, 2).toUpperCase();
        const res = await fetch(
          `${envConfig.api}hotel/${hotel}/${
            lang?.toUpperCase() || 'EN'
          }?location=${envConfig.portal}`,
        );
        const result = await res.json();
        /**
         * If hotel is found, launch, else redirect to home page
         */
        if (result?.payload?.page && hotel !== 'www') {
          localStorage.setItem(
            'lang',
            result.payload?.page?.lang.toLowerCase(),
          );
          localStorage.setItem('hotel', JSON.stringify(result.payload));
          setTimeout(() => {
            setData(result.payload);
          }, 1000);
        } else if (result?.redirect) {
          const protocol = window.location.protocol;
          window.location.href = protocol + '//' + result.redirect;
        } else {
          const host = window.location.host.slice(
            window.location.host.indexOf('.') + 1,
            window.location.host.length,
          );
          const protocol = window.location.protocol;
          window.location.href = protocol + '//' + host;
        }
      } catch (e) {
        console.log('Error obtenint hotel', e);
      }
    } else {
      try {
        setTypeFetch('home');
        const lang: any = navigator?.language?.slice(0, 2).toUpperCase();
        const res = await fetch(
          `${envConfig.api}hotel/home/${lang?.toUpperCase() || 'EN'}?location=${
            envConfig.portal
          }`,
        );
        const result = await res.json();
        localStorage.setItem(
          'lang',
          result[0]?.page?.lang.toLowerCase() || lang?.toLowerCase(),
        );
        setData(result);
      } catch (e) {
        console.log('Error obtenint hotel', e);
      }
    }
  };

  useEffect(() => {
    if (store?.payload) setData(store?.payload);
    else setData(store);
    // getHotel();
  }, []);

  return (
    <>{typeFetch == 'hotel' ? <Layout store={data} /> : <Home data={data} />}</>
  );
}
