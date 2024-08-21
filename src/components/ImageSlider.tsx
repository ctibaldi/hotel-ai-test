import React, {useState} from 'react';
import 'react-slideshow-image/dist/styles.css';
import {Slide} from 'react-slideshow-image';
import {Box, IconButton, useMediaQuery} from '@mui/material';
import envConfig from '@/configs/environments';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const API_URI = envConfig.api;

const ImageSlider = (props: any) => {
  const {images, hotel} = props;

  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        my: 2,
        mt: {xs: 6, md: 8},
        height: {xs: 300, md: 600},
      }}>
      <Slide
        autoplay={true}
        transitionDuration={250}
        prevArrow={
          <IconButton
            aria-label="delete"
            size="small"
            sx={{backgroundColor: 'rgb(255,255,255,0.9)', m: 1}}>
            <ArrowBackIosNewOutlinedIcon sx={{p: 0, m: 0}} />
          </IconButton>
        }
        nextArrow={
          <IconButton
            aria-label="delete"
            size="small"
            sx={{backgroundColor: 'rgb(255,255,255,0.9)', m: 1}}>
            <ArrowForwardIosOutlinedIcon sx={{p: 0, m: 0}} />
          </IconButton>
        }>
        {images?.length > 0 &&
          images?.map((img: any) => (
            <div
              key={(img._id + Math.random()) as string}
              className="each-slide-effect">
              <ImageSliderComponent
                key={(img._id + Math.random()) as string}
                image={img}
                hotel={hotel}
              />
            </div>
          ))}
      </Slide>
    </Box>
  );
};

export default ImageSlider;

const ImageSliderComponent = (props: any) => {
  const {image, hotel} = props;
  const [src, setSrc] = useState();
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <img
      src={
        matches
          ? `${API_URI}image/${hotel}/large/${image._id}`
          : `${API_URI}image/${hotel}/low/${image._id}`
      }
      alt={image?.alt}
      style={{
        maxHeight: matches ? 600 : 300,
        minHeight: matches ? 600 : 300,
        objectFit: 'cover',
        maxWidth: '100%',
        minWidth: '100%',
      }}
    />
  );
};
