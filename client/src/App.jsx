import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Avatar,
  Container,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import MovieIcon from '@mui/icons-material/Movie';
import { styled } from '@mui/material/styles';
import palettes from './palettes';
import DecryptAnimation from './components/DecryptAnimation';
import Market from "@mui/icons-material/GraphicEq"
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ShinyText from './components/ShinyText';
import mexc from "./assets/mexc.png"
import TiltedCard from './components/TiltedCard';
import PumpFun from "./assets/pump.png"
import Twitter from "@mui/icons-material/Twitter"
import Telegram from "@mui/icons-material/Telegram"
import DotGrid from './components/DotGrid';
import ZaZaCard from './components/ZaZaCard';
import CardsGrid from './components/CardsGrid';
import Hero from './components/Hero';
import wow from "./assets/wow.png"
import money from "./assets/money.png"
import ProfileCard from './components/ProfileCard';
import boi from './assets/boi.png'
import Footer from './components/Footer';

export const COLORS = palettes

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const cardData = [
    {
      icon: <RocketLaunchIcon sx={{ color: COLORS.accent }} fontSize="large" />,
      title: 'Viral Tweet Generator',
      link: "/tweet-generator",
      description: 'Create viral tweets for your coin in just one click!',
    },
    {
      icon: <Market sx={{ color: COLORS.subtext }} fontSize="large" />,
      title: 'Viral Meme Generator',
      link: "/meme-generator",
      description: 'Create funny memes based on your coin 🤑 ',
    },
    {
      icon: <MovieIcon sx={{ color: COLORS.subtext }} fontSize="large" />,
      title: 'Under development...',
      description: 'Section coming soon ... 💥',
    },
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      {/* Sezione principale */}
      <Box
        sx={{
          minHeight: '100vh',
          color: COLORS.text,
          py: { xs: 2, md: 8 },
          width: "100vw",
          position: 'relative',
          background: COLORS.black,
          display: 'flex',
          flexDirection: 'column',
          translate: isMobile ? "0 -30px" : "0 -60px",
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* ✅ Sfondo DotGrid */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: isMobile ? '120vh' : '110vh',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <DotGrid
            dotSize={isMobile ? 5 : 7}
            gap={isMobile ? 8 : 10}
            baseColor={COLORS.accentOpacino}
            activeColor={COLORS.accent}
            proximity={isMobile ? 80 : 100}
            shockRadius={isMobile ? 120 : 150}
            shockStrength={isMobile ? 3 : 5}
            resistance={450}
            returnDuration={2}
          />
        </Box>

        <Container 
          maxWidth="lg" 
          sx={{ 
            height: isMobile ? "auto" : "200vh", 
            width: "95%", 
            zIndex: 1, 
            position: 'relative', 
            mb: isMobile ? 5 : 15,
            px: isMobile ? 1 : 3
          }}
        >
          {/* Titoli animati */}
          <Box 
            display="flex" 
            alignItems={isMobile ? "center" : "center"} 
            justifyContent="space-between"
            flexDirection={isMobile ? "column" : "row"}
            gap={isMobile ? 4 : 0}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: isMobile ? 5 : 10,
                height: isMobile ? "auto" : "100vh",
                mb: isMobile ? 5 : 30,
                textAlign: isMobile ? 'center' : 'left',
                width: isMobile ? "100%" : "auto"
              }}
            >
              <Hero />
            </Box>
            
            {/* Cards */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: isMobile ? 2 : 4,
                translate: isMobile ? "0 0" : "0 -100px",
                mb: isMobile ? 5 : 14,
                width: isMobile ? "100%" : "auto"
              }}
            >
              <CardsGrid cardData={cardData} />
            </Box>
          </Box>

          <ZaZaCard />

          {/* Sezione 2*/}
        </Container>

        <Box
          sx={{
            width: '95%',
            backgroundColor: COLORS.black,
            py: isMobile ? 6 : 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: isMobile ? 4 : 6,
            mb: isMobile ? 10 : 20,
            textAlign: "center",
            flexWrap: 'wrap',
            px: isMobile ? 2 : 4,
            flexDirection: isMobile ? 'column' : 'row'
          }}
        >
          <Box sx={{ 
            order: isMobile ? 2 : 1,
            width: isMobile ? "60%" : "auto",
            mt: isMobile ? 7 : 0
          }}>
            <ProfileCard
              name="Za Za Za Sahur"
              title="Best & Highest memecoin"
              handle="CommunyTrip"
              status="Online"
              contactText="Follow"
              avatarUrl={wow}
              iconUrl={money}
              showUserInfo={true}
              enableTilt={!isMobile}
              onContactClick={() => window.location.replace("https://x.com/CommunyTrip")}
            />
          </Box>
          
          <Box sx={{ 
            maxWidth: isMobile ? "100%" : "55%", 
            flex: 1,
            order: isMobile ? 1 : 2,
            px: isMobile ? 1 : 0
          }}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              sx={{ 
                fontWeight: 'bold', 
                mb: 3, 
                color: COLORS.accent,
                fontSize: isMobile ? (isSmallMobile ? "1.3rem" : "1.5rem") : "2.125rem",
                lineHeight: 1.2,
                textTransform:"uppercase"
              }}
            >
              Everyone's hunting the next 100x — but let's be real, most are just chasing shadows.
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3,
                fontSize: isMobile ? (isSmallMobile ? "0.875rem" : "1rem") : "1rem",
                lineHeight: 1.6,
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              Enter <strong style={{ color: COLORS.accent }}>$ZZZSHR's world</strong>: not your average memecoin, but the <i>only</i> one bold enough to flex on the entire market while holding a cigar. 🚬
              <br /><br />
              Whether you're ready to ride this rocket to the moon, survive a zombie apocalypse of rug pulls, or just vibe with the <strong style={{ color: COLORS.accent }}>highest meme royalty</strong>, you're in the right place. This isn't just a token, it's a movement — and you're either in or left explaining to your friends why you missed out.
              <br /><br />
              <strong style={{ color: COLORS.subtext }}>Community? Strong. Memes? Sharper than ever. Potential? Don't make us laugh — it's inevitable.</strong>
            </Typography>
            
            <Box
              component={Link}
              to="/learn-more"
              sx={{
                display: 'inline-block',
                backgroundColor: COLORS.accent,
                color: COLORS.text,
                px: isMobile ? 2 : 3,
                py: isMobile ? 1 : 1.5,
                borderRadius: 2,
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: isMobile ? (isSmallMobile ? "0.875rem" : "1rem") : "1rem",
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: COLORS.subtext,
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              }}
            >
              LEARN MORE
            </Box>
          </Box>
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export default App;