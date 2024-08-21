import {t} from '@/configs/translate/translate.service';
import HotelCard from '@/layouts/home/components/HotelCard';
import {Container, Grid, Typography} from '@mui/material';
import React from 'react';

const Relates = ({relates, hotel}: any) => {
  return (
    <Container maxWidth={'lg'}>
      <Typography sx={{fontSize: 24}}>
        {t('exploreHotels')}
      </Typography>
      <Grid container spacing={2} sx={{mt: 1, mb:3}}>
        {relates?.map((hotel: any, index: number) => (
          <HotelCard hotel={hotel} key={index} grid={3} related={true} />
        ))}
      </Grid>
    </Container>
  );
};

export default Relates;
