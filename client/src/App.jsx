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

  const cardData = [
    {
      icon: <RocketLaunchIcon sx={{ color: COLORS.accent }} fontSize="large" />,
      title: 'Viral Tweet Generator',
      link: "/figamaiala-generatore-di-cazzo-di-tweet-virali",
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
      title: 'In development...',
      description: 'Still under development... 💥',
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
          py: { xs: 4, md: 8 },
          width: "100vw",
          position: 'relative',
          background: COLORS.black,
          display: 'flex',
          flexDirection: 'column',
          translate: "0 -60px",
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
            height: '110vh',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <DotGrid
            dotSize={7}
            gap={10}
            baseColor={COLORS.accentOpacino}
            activeColor={COLORS.accent}
            proximity={100}
            shockRadius={150}
            shockStrength={5}
            resistance={450}
            returnDuration={2}
          />
        </Box>

        <Container maxWidth="lg" sx={{ height: "200vh", width: "100vw", zIndex: 1, position: 'relative', mb: 15 }}>
          {/* Titoli animati */}
          <Box display="flex" alignItems="center" justifyContent="space-between">

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 10,
                height: "100vh",
                mb: 30,
                textAlign: 'left',
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
                gap: 4,
                translate: "0 -100px",
                mb: 14,
              }}
            >
              <CardsGrid cardData={cardData} />
            </Box>
          </Box>

          <ZaZaCard />

          {/* Sezione 2*/}

        </Container >

        <Box
          sx={{
            width: '100%',
            backgroundColor: COLORS.black,
            py: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: 6,
            mb:20,
            textAlign: "center",
            flexWrap: 'wrap',
            px: 4,
          }}
        >
          <ProfileCard
            name="Za Za Za Sahur"
            title="Best & Highest memecoin"
            handle="CommunyTrip"
            status="Online"
            contactText="Follow"
            avatarUrl={wow}
            iconUrl={money}
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => window.location.replace("https://x.com/CommunyTrip")}
          />
          <Box sx={{ maxWidth: 500, flex: 1 }}>

            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: COLORS.accent }}>
              Everyone’s hunting the next 100x — but let’s be real, most are just chasing shadows.
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Enter <strong style={{ color: COLORS.accent }}>$ZZZSHR's world</strong>: not your average memecoin, but the <i>only</i> one bold enough to flex on the entire market while holding a cigar. 🚬
              <br /><br />
              Whether you're ready to ride this rocket to the moon, survive a zombie apocalypse of rug pulls, or just vibe with the <strong style={{ color: COLORS.accent }}>highest meme royalty</strong>, you're in the right place. This isn’t just a token, it’s a movement — and you’re either in or left explaining to your friends why you missed out.
              <br /><br />
              <strong style={{ color: COLORS.subtext }}>Community? Strong. Memes? Sharper than ever. Potential? Don’t make us laugh — it’s inevitable.</strong>
            </Typography>
            <Box
              component={Link}
              to="/learn-more"
              sx={{
                display: 'inline-block',
                backgroundColor: COLORS.accent,
                color: COLORS.text,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: COLORS.subtext,
                },
              }}
            >
              LEARN MORE
            </Box>
          </Box>

        </Box>

        <Footer />
      </Box >


    </>
  );
};

export default App; 