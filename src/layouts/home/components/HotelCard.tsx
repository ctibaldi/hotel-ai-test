import envConfig from '@/configs/environments';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  colors,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {t} from '@/configs/translate/translate.service';
const API_URI = envConfig.api;

interface IProps {
  hotel: any;
  grid?: any;
  related?: boolean;
}

const HotelCard = ({hotel, grid, related}: IProps) => {
  const [href, setHref] = useState('');
  const stars = [1, 2, 3, 4, 5];
  const router = useRouter();

  const navigate = () => {
    const url = `${window?.location?.protocol}//${hotel?.code}.${
      window.location.host
    }/${
      localStorage.getItem('lang') !== 'undefined'
        ? localStorage.getItem('lang')?.slice(0, 2)
        : 'en'
    }`;
  };

  useEffect(() => {
    if (typeof window != 'undefined') {
      setHref(
        related
          ? `${window.location.protocol}//${hotel?.code}.com-${
              envConfig.portal
            }.com/${
              localStorage.getItem('lang') !== 'undefined'
                ? localStorage.getItem('lang')?.slice(0, 2)
                : 'en'
            }`
          : `${window.location.protocol}//${hotel?.code}.${window.location.host}/`,
      );
    }
  }, []);

  const image = `${API_URI}image/${hotel?.code}/large/${hotel.page?.content?.banner?._id}`;

  return (
    <Grid item xs={12} sm={12} md={grid || 4}>
      <Card
        sx={{
          p: 1,
          minHeight: 390,
          backgroundColor: 'transparent',
          position: 'relative',
          borderRadius: 4,
          ':hover': {
            boxShadow: `1px 12px 34px -14px rgba(0,0,0,0.49);
-webkit-box-shadow: 1px 12px 34px -14px rgba(0,0,0,0.49);
-moz-box-shadow: 1px 12px 34px -14px rgba(0,0,0,0.49);`,
          },
        }}
        elevation={0}>
        <CardMedia
          sx={{borderRadius: 3, cursor: 'pointer'}}
          component="img"
          onClick={() => navigate()}
          alt={hotel.page?.content?.banner?.alt}
          height="220"
          image={image}
        />
        {/* <CardContent> */}
        <Box sx={{p: 0}}>
          <Box sx={{minHeight: 100}}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{mt: 2, mb: 0}}>
              {hotel?.page?.title}
            </Typography>
            {stars?.slice(0, hotel?.stars)?.map((s: any, index: number) => (
              <StarIcon
                key={index}
                sx={{fontSize: 18, mt: 0, color: colors.orange['300']}}
              />
            ))}
            {stars?.slice(hotel?.stars, 5)?.map((s: any, index: number) => (
              <StarIcon
                key={index}
                sx={{fontSize: 18, mt: 0, color: colors.grey['300']}}
              />
            ))}
            <Typography variant="body2" color="text.secondary">
              {hotel?.page?.content?.address?.text
                ? hotel?.page?.content?.address?.text
                : hotel?.page?.content?.address?.city}
            </Typography>
          </Box>
          <Button
            component={Link}
            href={href}
            disableElevation
            variant="contained"
            // onClick={() => navigate()}
            sx={{
              mt: 2,
              width: '100%',
              border: '2px solid white',
            }}>
            {/* Ver más */}
            {t('seeMore')}
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default HotelCard;
