import { Box, Card, CardActionArea, CardContent, styled, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../App';

const HoverCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[6],
  },
}));

const CardsGrid = ({ cardData }) => {
  return (
    <>
      {cardData.map((card, index) => (
        <Link to={card.link ? card.link : "/"} key={index}>
          <HoverCard
            sx={{
              minWidth: { xs: '100%', sm: 200 },
              maxWidth: 250,
              background: COLORS.blacky,
              borderRadius: 3,
              border: `1px solid ${COLORS.accentOpacino}`,
              boxShadow: 3,
            }}
          >
            <CardActionArea>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  {card.icon}
                  <Typography variant="h6" color={COLORS.text}>
                    {card.title}
                  </Typography>
                </Box>
                <Typography variant="body2" mt={2} color={COLORS.subtext}>
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </HoverCard>
        </Link>
      ))}
    </>
  );
};

export default CardsGrid;
