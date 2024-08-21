import {Box, CircularProgress, colors} from '@mui/material';
import React from 'react';

const LoadingPage = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        mt: -5,
      }}>
      <CircularProgress
        size={70}
        // sx={{ color: colors.purple['A400'] }}
      />
    </Box>
  );
};

export default LoadingPage;
