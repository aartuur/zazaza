import React from 'react';
import DecryptAnimation from './DecryptAnimation';
import { Box, Typography } from '@mui/material';
import { COLORS } from '../App';

const Hero = () => {
  return (
    <>
      {['ZA ZA ZA', 'SAHUR', '$ZZZZSHR'].map((word, index) => (
        <Typography
          key={index}
          variant="h1"
          color={COLORS.accent}
          sx={{
            fontFamily: '"Wallpoet", sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            width: '7.5ch',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <DecryptAnimation
            text={word}
            animateOn="view"
            characters="abcdefABCDEB1234567890@#$%&!?"
            speed={50 + index * 20}
            revealDirection="start"
            maxIterations={40}
          />
        </Typography>
      ))}
    </>
  );
};

export default Hero;
