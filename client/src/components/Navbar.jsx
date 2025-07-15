import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { COLORS } from '../App'
import { Link } from 'react-router-dom';
import FuzzyText from './FuzzyText';


const Navbar = () => {
    return (
        <AppBar position="sticky" elevation={6} sx={{ backgroundColor: COLORS.black ,mb:0,borderBottom:"2px solid ".concat(COLORS.accent)}} >
            <Toolbar >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "94vw" }}>
                    <Link style={{ color: COLORS.accent, fontSize: "1.5rem", fontWeight: "bolder" }} to="/">
                        $ZZZZSHR
                    </Link>
                    <Link
                        to="https://pump.fun/coin/HmQu37wPWCPMGgi3PNjufk7gMiPo9WSwhuRGaU8tpump"
                        style={{
                            textAlign: 'center',
                            flexGrow: 1,
                            color: COLORS.accent,
                            fontSize: '1.25rem',
                            translate:"0 5px",
                            textDecoration: 'none'  // rimuove sottolineatura
                        }}
                        target='_blank'
                    >
                        <FuzzyText
                            baseIntensity={0.15}
                            hoverIntensity={0.3}
                            enableHover={true}
                            fontSize='1.6rem'
                            color={COLORS.accent}
                        >
                            HmQu37wPWCPMGgi3PNjufk7gMiPo9WSwhuRGaU8tpump
                        </FuzzyText>
                    </Link>

                    <Tooltip title="Autore">
                        <Avatar sx={{ bgcolor: COLORS.accent, color: '#000' }}>A</Avatar>
                    </Tooltip>
                </Box>


            </Toolbar>
        </AppBar>
    )
}

export default Navbar
