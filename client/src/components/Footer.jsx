import React from 'react';
import { Box, Typography, Container, Divider, Stack, Link as MuiLink, Grid } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Link } from 'react-router-dom';
import COLORS from '../palettes';
import ChartData from './ChartData';

const Footer = () => {
  return (
    <Box sx={{
      backgroundColor: COLORS.black,
      color: COLORS.text,
      pt: 1,
      pb: 1,
      mt: 6,
      width: "100%",
      borderTop: `1px solid ${COLORS.accent}`,
      fontSize: '1rem',
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"column",
      textAlign:"center"
    }}>
      <Container maxWidth="lg" sx={{ px: 0,width:"70%",my:4 }}>
        <Grid container spacing={1} justifyContent="space-between" alignItems="flex-start" >
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="subtitle2" sx={{ color: COLORS.accent, mb: 0.5 }}>Quick Links</Typography>
            <Stack spacing={0.3}>
              <Link to="/learn-more" style={{ color: COLORS.text, textDecoration: 'none' }}>Learn More</Link>
              <Link to="/roadmap" style={{ color: COLORS.text, textDecoration: 'none' }}>Roadmap</Link>
              <Link to="/faq" style={{ color: COLORS.text, textDecoration: 'none' }}>FAQ</Link>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="subtitle2" sx={{ color: COLORS.accent, mb: 0.5 }}>Social</Typography>
            <Stack spacing={0.3}>
              <MuiLink href="https://x.com/CommunyTrip" target="_blank" rel="noopener" sx={{ color: COLORS.text, display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none' }}>
                <TwitterIcon fontSize="small" /> Twitter
              </MuiLink>
              <MuiLink href="https://t.me/yourchannel" target="_blank" rel="noopener" sx={{ color: COLORS.text, display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none' }}>
                <TelegramIcon fontSize="small" /> Telegram
              </MuiLink>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="subtitle2" sx={{ color: COLORS.accent, mb: 0.5 }}>Trade me!</Typography>
            <Stack spacing={0.3}>
              <Link to="/terms" style={{ color: COLORS.text, textDecoration: 'none' }}>Axiom</Link>
              <Link to="/privacy" style={{ color: COLORS.text, textDecoration: 'none' }}>Dexscreener</Link>
              <Link to="/privacy" style={{ color: COLORS.text, textDecoration: 'none' }}>Pump.fun</Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ backgroundColor: COLORS.subtext, opacity: 0.2, my: 2 }} />
        <ChartData />

        <Typography variant="caption" align="center" sx={{ color: COLORS.subtext, display: 'block',mt:5 }}>
          © {new Date().getFullYear()} $ZZZSHR. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
