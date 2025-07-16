import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { COLORS } from '../App'
import { Link } from 'react-router-dom';
import FuzzyText from './FuzzyText';

const Navbar = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position="sticky" elevation={6} sx={{ backgroundColor: COLORS.black, mb: 0, borderBottom: "2px solid ".concat(COLORS.accent), width: "100vw", }}>
            <Toolbar>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width:"100%",
                    gap: { xs: 1, sm: 2 }
                }}>

                    <Link
                        to="/"
                        style={{
                            textAlign: 'start',
                            flexGrow: 1,
                            color: COLORS.accent,
                            fontSize: '1.25rem',
                            translate: "0 5px",
                            textDecoration: 'none',
                            minWidth: 0,  // permette al flex item di ridursi sotto la sua dimensione naturale
                            overflow: 'hidden'  // nasconde il testo che va oltre
                        }}
                        target='_blank'
                    >
                        {/* Versione abbreviata per mobile */}
                        <Box sx={{translate:isMobile && "-15% 0"}}>
                            <FuzzyText
                                baseIntensity={0.15}
                                hoverIntensity={0.3}
                                enableHover={true}
                                fontSize='1.5rem'
                                color={COLORS.accent}
                            >
                                $ZZZSHR
                            </FuzzyText>
                        </Box>
                    </Link>

                    <Tooltip title="Autore">
                        <Avatar sx={{
                            bgcolor: COLORS.accent,
                            color: '#000',
                            flexShrink: 0,
                            width: { xs: 32, sm: 40 },
                            height: { xs: 32, sm: 40 },
                            fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}>
                            A
                        </Avatar>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar