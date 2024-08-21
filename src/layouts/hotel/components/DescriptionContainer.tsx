import {Box, Grid, Typography, colors, useMediaQuery} from '@mui/material';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {t} from '@/configs/translate/translate.service';

const DescriptionContainer = (props: any) => {
  const {page, hotel} = props;
  const matches = useMediaQuery('(min-width:600px)');
  const description = page?.description?.split('. ');
  const stars = [1, 2, 3, 4, 5];

  return (
    <Grid item xs={12} md={7} sx={{m: 2, mt: 0}}>
      <Typography component="h2" variant="h5" sx={{pt: 0}}>
        {page?.title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          mb: 1,
        }}>
        {stars?.slice(0, hotel?.stars)?.map((s: any, index: number) => (
          <StarIcon key={index} sx={{color: colors.orange['300']}} />
        ))}
      </Box>
      {description?.length > 0 &&
        description?.map((des: any, index: number) => (
          <Typography key={index} component="p" sx={{pt: 1}}>
            {des}
          </Typography>
        ))}
      {page?.detail?.split('.')?.map((p: any, index: number) => (
        <Typography key={index} component="p" sx={{pt: 1}}>
          {p}
        </Typography>
      ))}

      {page?.toConsider && (
        <Box sx={{mt: 2}}>
          <Typography
            component="h3"
            variant="h5"
            sx={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              pt: 2,
              mb: 1,
            }}>
            {page?.toConsider?.title}
          </Typography>
          {page?.toConsider?.text?.split('.')?.map((p: any, index: number) => (
            <Typography
              key={index}
              component="p"
              sx={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                mb: 1,
              }}>
              {p}
            </Typography>
          ))}
        </Box>
      )}
      {page?.popularService && (
        <Box sx={{mt: 2}}>
          <Typography
            component="h3"
            variant="h5"
            sx={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              pt: 2,
              mb: 1,
            }}>
            {page?.popularService?.title}
          </Typography>

          <Grid container spacing={0} sx={{mb: 3}}>
            {page?.popularService?.text
              ?.split('.')
              ?.slice(1, page?.popularService?.text?.split('.')?.length)
              ?.map((p: any, index: number) => (
                <Grid item xs={12} md={6} key={index}>
                  <Typography
                    component="li"
                    sx={{
                      display: 'flex',
                      alignContent: 'center',
                      alignItems: 'center',
                      mb: 1,
                    }}>
                    <ChevronRightIcon sx={{pb: 0.2}} /> {p}
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
      <Typography
        component="address"
        sx={{
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          pt: 1,
          mb: 1,
          fontStyle:'normal'
        }}>
        <LocationOnIcon
          sx={{
            pr:1,
            color: colors.blue['600'],
          }}
        />
        {page?.address?.text}
      </Typography>
      <iframe
        src={`https://maps.google.com/maps?q=${page?.address?.ltd}, ${page?.address?.lng}&z=15&output=embed`}
        width="100%"
        style={{border: 'none'}}
        height={matches ? '450' : '250'}
        data-frameborder="0"
        data-style="border:0"></iframe>
    </Grid>
  );
};

export default DescriptionContainer;
