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


const getRandomPalette = () => {
  return palettes[Math.floor(Math.random() * palettes.length)];
};

export const COLORS = getRandomPalette();

const App = () => {

  const cardData = [
    {
      icon: <RocketLaunchIcon sx={{ color: COLORS.accent }} fontSize="large" />,
      title: 'Viral Tweet Generator',
      link: "/figamaiala-generatore-di-cazzo-di-tweet-virali",
      description: 'Crea tweet virali e coinvolgenti con un click!',
    },
    {
      icon: <Market sx={{ color: COLORS.subtext }} fontSize="large" />,
      title: 'Viral Meme Generator',
      link: "/meme-generator",
      description: 'Crea dei meme divertenti su meme ed immagini da te specificati 🤑 ',
    },
    {
      icon: <MovieIcon sx={{ color: COLORS.subtext }} fontSize="large" />,
      title: 'Creatore di TikTok spakkosi',
      description: 'Genera idee e script per TikTok che fanno boom 💥',
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

        <Container maxWidth="lg" sx={{ height: "200vh", width: "100vw", zIndex: 1, position: 'relative', mb: 30 }}>
          {/* Titoli animati */}
          <Box display="flex" alignItems="center" justifyContent="space-between">

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 10,
                height: "100vh",
                mb: 25,
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
                translate: "0 -70px",
                mb: 10,
              }}
            >
              <CardsGrid cardData={cardData} />
            </Box>
          </Box>

          <ZaZaCard />

          {/* Sezione 2*/}

        </Container >

        <Box display="flex" alignItems="center" justifyContent="space-between" width="70%">
          <Box>
            <Typography>ZA ZA ZA ZA SAHUR</Typography>
          </Box>
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
        </Box>
      </Box >

    </>
  );
};

export default App; 