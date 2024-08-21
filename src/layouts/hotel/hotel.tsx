import DrawerAppBar from '@/components/AppBar';
import HeadApp from '@/components/HeadApp';
import {Box, Container, Grid, useMediaQuery} from '@mui/material';
import React, {useEffect, useState} from 'react';
import LoadingPage from '@/components/LoadingPage';
import ImageSlider from '@/components/ImageSlider';
import DescriptionContainer from './components/DescriptionContainer';
import BookingComponent from './components/BookingComponent';
import Footer from '@/components/Footer';
import Relates from './components/Relates';

interface IProps {
  hotel: string;
}

const HotelLayout = (props: any) => {
  const {store} = props;

  // ** States
  const [lang, setLang] = useState<any>('');

  // ** Constants
  const matches = useMediaQuery('(min-width:600px)');

  // ** Rendering
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLang(store?.lang);
      document.documentElement.lang = store?.lang?.toLowerCase();
    }
  }, []);

  return (
    <>
      {store?.page ? (
        <div>
          {/**
           * Head for the app to set meta tags
           */}
          <HeadApp
            title={store?.page?.content?.title}
            meta={store?.page?.meta}
            code={store?.code}
            page={store?.page?.content}
            lang={store?.lang}
          />

          <DrawerAppBar
            title={store?.page?.title}
            lang={store?.lang}></DrawerAppBar>

          {/* {!matches && ( */}
          <ImageSlider
            images={store?.page?.content?.images}
            hotel={store?.code}
          />
          {/* )} */}
          {matches ? (
            <Container maxWidth="lg">
              <Grid
                container
                spacing={2}
                sx={{p: 0, pt: 5, pb: {xs: 0, md: 10}}}>
                <BookingComponent
                  hotel={store?.page?.title}
                  data={store}
                  lang={lang}
                />
                <DescriptionContainer
                  page={store?.page?.content}
                  hotel={store}
                  title={store?.page?.title}
                />
              </Grid>
            </Container>
          ) : (
            <Grid container spacing={2} sx={{p: 0, pt: 5, pb: {xs: 0, md: 10}}}>
              <BookingComponent
                hotel={store?.page?.title}
                data={store}
                lang={lang}
              />
              <DescriptionContainer page={store?.page?.content} />
            </Grid>
          )}

          <Relates relates={store?.relates} hotel={store?.page?.title} />

          {/**
           * Footer
           */}
          <Footer />
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default HotelLayout;
