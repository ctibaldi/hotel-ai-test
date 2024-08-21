import DrawerAppBar from '@/components/AppBar';
import HeadApp from '@/components/HeadApp';
import LoadingPage from '@/components/LoadingPage';
import {Container} from '@mui/material';
import React, {useEffect, useState} from 'react';
import HotelList from './components/HotelList';
import Footer from '@/components/Footer';
import {metaTags} from '@/utils/metas';
import Portal from './components/Portal';
import envConfig from '@/configs/environments';
import {upperCase} from '@/utils/utils';

const portal: any =
  envConfig.portal == 'grancanaria' ? 'Gran Canaria' : envConfig.portal;

const HomeLayout = ({data}: any) => {
  const [meta, setMeta] = useState<any>('');

  useEffect(() => {
    if (typeof window !== undefined) {
      // if (localStorage.getItem('lang') == 'undefined')
      //   localStorage.removeItem('lang');
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const res: any = metaTags.filter(
        (m: any) => m.lang == localStorage.getItem('lang'),
      );
      setMeta(res[0]);
    }
  }, [data]);

  return (
    <>
      {data?.length > 0 ? (
        <>
          <HeadApp
            // title={meta?.meta_twitter?.title}
            title={'COM ' + upperCase(portal)}
            meta={meta}
            code={''}
            page={meta?.content}
            section={'home'}
          />
          <DrawerAppBar
            title={`COM ${portal?.toUpperCase()}`}
            section={'home'}></DrawerAppBar>
          <Portal></Portal>
          <Container sx={{mb: {xs: 4, md: 10}}}>
            <HotelList hotels={data}></HotelList>
          </Container>
          <Footer section={'home'} />
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default HomeLayout;
