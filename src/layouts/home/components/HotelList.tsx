import React from 'react';
import HotelCard from './HotelCard';
import {Grid} from '@mui/material';

interface IProps {
  hotels: any;
}

const HotelList = ({hotels}: IProps) => {
  return (
    <div>
      <Grid container spacing={4} sx={{mt: {xs: 6, md: 10}}}>
        {hotels
          ?.filter((h: any) => h !== null && h?.page?.content?.description)
          .map((hotel: any, index: number) => (
            <HotelCard hotel={hotel} key={index}></HotelCard>
          ))}
      </Grid>
    </div>
  );
};

export default HotelList;
