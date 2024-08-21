import envConfig from '@/configs/environments';
import {t} from '@/configs/translate/translate.service';
import {Box, Container, Typography, useMediaQuery} from '@mui/material';
import React from 'react';

const Portal = ({sx}: any) => {
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Box
      sx={{
        mt: {xs: 10, md: 8},
        mb: {xs: -10, md: 0},
        backgroundImage: {xs: '', md: 'url(/portal.avif)'},
        backgroundPosition: 'bottom',
        height: {xs: '75vh', md: '94vh'},
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {matches ? (
        <Container
          maxWidth="lg"
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'center',
            pt: 10,
            justifyContent: 'center',
          }}>
          <Typography
            component="h1"
            variant="h3"
            sx={{
              mb: 2,
              mt: -5,
              // mt: {xs: 10, md: 24},
              color: 'white',
              textShadow: `1px 1px 2px rgba(0,0,0,0.79)`,
              fontWeight: 800,
            }}>
            {t('exploreTheBestAccomodation')}
          </Typography>
          <iframe
            data-frameborder="0"
            style={{border: 'none', marginBottom: 0}}
            scrolling="auto"
            src={`https://bookingtravel.com-tenerife.com/public/widget/404326/1224849420?selected_tab=H`}
            width="100%"
            height="500">
            Buscador
          </iframe>
        </Container>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            // backgroundColor: '#f1f1f1',
          }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              mb: 2,
              color: '#333',
              fontWeight: 800,
              mt: {xs: -10, md: 0},
              // mt: {xs: 20, md: 10},
              // color: 'dark',
              textShadow: `2px 4px 13px rgba(255,255,255,0.79)`,
            }}>
            {t('exploreTheBestAccomodation')}
          </Typography>
          <iframe
            data-frameborder="0"
            style={{
              border: 'none',
              marginBottom: -200,
              padding: 10,
              borderRadius: 3,
            }}
            scrolling="auto"
            src={`https://bookingtravel.com-${envConfig.portal}.com/public/widget/404326/1224849420?selected_tab=H`}
            width="100%"
            height="500">
            Buscador
          </iframe>
        </Box>
      )}
    </Box>
  );
};

export default Portal;
