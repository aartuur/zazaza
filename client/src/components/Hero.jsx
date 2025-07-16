import React from 'react';
import DecryptAnimation from './DecryptAnimation';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { COLORS } from '../App';

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down(480));

  // Parametri responsive per le animazioni
  const getAnimationParams = (index) => {
    if (isExtraSmall) {
      return {
        speed: 30 + index * 10, // Velocità ridotta per dispositivi molto piccoli
        maxIterations: 25, // Meno iterazioni per performance
      };
    }
    if (isSmallMobile) {
      return {
        speed: 40 + index * 15,
        maxIterations: 30,
      };
    }
    if (isMobile) {
      return {
        speed: 45 + index * 18,
        maxIterations: 35,
      };
    }
    return {
      speed: 50 + index * 20, // Valori originali per desktop
      maxIterations: 40,
    };
  };

  // Stili responsive per la tipografia
  const getTypographyStyles = () => {
    if (isExtraSmall) {
      return {
        fontSize: '2.5rem', // ~40px
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      };
    }
    if (isSmallMobile) {
      return {
        fontSize: '3rem', // ~48px
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      };
    }
    if (isMobile) {
      return {
        fontSize: '3.5rem', // ~56px
        lineHeight: 1.1,
        letterSpacing: '-0.01em',
      };
    }
    return {
      fontSize: '6rem', // Desktop default
      lineHeight: 1.2,
      letterSpacing: 'normal',
    };
  };

  // Calcola la larghezza del contenitore in base al contenuto
  const getContainerWidth = (word) => {
    if (isExtraSmall) {
      return word.length > 6 ? '100%' : `${word.length * 1.2}ch`;
    }
    if (isSmallMobile) {
      return word.length > 7 ? '100%' : `${word.length * 1.1}ch`;
    }
    if (isMobile) {
      return word.length > 8 ? '100%' : `${word.length}ch`;
    }
    return '7.5ch'; // Desktop default
  };

  const words = ['ZA ZA ZA', 'SAHUR', '$ZZZZSHR'];
  const typographyStyles = getTypographyStyles();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMobile ? 'center' : 'flex-start',
        gap: isMobile ? 1 : 2,
        width: '100%',
        overflow: 'hidden',
        px: isMobile ? 1 : 0,
      }}
    >
      {words.map((word, index) => {
        const animationParams = getAnimationParams(index);
        
        return (
          <Box
            key={index}
            sx={{
              width: isMobile ? '100%' : 'auto',
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'flex-start',
              overflow: 'hidden',
            }}
          >
            <Typography
              variant="h1"
              color={COLORS.accent}
              sx={{
                fontFamily: '"Wallpoet", sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                width: getContainerWidth(word),
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textAlign: isMobile ? 'center' : 'left',
                ...typographyStyles,
                // Aggiunge un'ombra del testo per migliorare la leggibilità su mobile
                ...(isMobile && {
                  textShadow: `0 0 20px ${COLORS.accent}40, 0 0 40px ${COLORS.accent}20`,
                }),
                // Animazione di fade-in iniziale
                '@keyframes fadeInScale': {
                  '0%': {
                    opacity: 0,
                    transform: 'scale(0.8)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'scale(1)',
                  },
                },
                animation: `fadeInScale 0.6s ease-out ${index * 0.2}s both`,
              }}
            >
              <DecryptAnimation
                text={word}
                animateOn="view"
                characters="abcdefABCDEB1234567890@#$%&!?"
                speed={animationParams.speed}
                revealDirection="start"
                maxIterations={animationParams.maxIterations}
              />
            </Typography>
          </Box>
        );
      })}
      
      {/* Elemento decorativo responsive */}
      <Box
        sx={{
          width: isMobile ? '80%' : '100%',
          height: '2px',
          background: `linear-gradient(90deg, ${COLORS.accent} 0%, transparent 100%)`,
          mt: isMobile ? 2 : 3,
          animation: 'fadeInScale 0.8s ease-out 0.6s both',
          alignSelf: isMobile ? 'center' : 'flex-start',
        }}
      />
    </Box>
  );
};

export default Hero;