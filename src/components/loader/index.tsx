import React from 'react';
import Box from '@mui/material/Box';
import { varAlpha } from 'minimal-shared/utils';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const Loader = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: '#724121' },
      }}
    />
  </Box>
);

export default Loader;
