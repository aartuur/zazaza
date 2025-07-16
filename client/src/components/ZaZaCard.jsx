import React, { useRef } from 'react'
import { motion } from "framer-motion";
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import TiltedCard from './TiltedCard';
import ShinyText from './ShinyText';
import { Link } from 'react-router-dom';
import { COLORS } from '../App';
import boi from "../assets/boi.png"
import Twitter from "@mui/icons-material/Twitter"
import Telegram from "@mui/icons-material/Telegram"
import PumpFun from "../assets/pump.png"
import mexc from "../assets/mexc.png"
import { useInView } from "react-intersection-observer";

const ZaZaCard = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: isMobile ? "-10vw" : "-20vw" }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: .5 }}
            >
                <Box sx={{ 
                    textAlign: 'center', 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: isMobile ? "center" : "space-between",
                    flexDirection: isMobile ? "column" : "row",
                    translate: isMobile ? "0 -10vh" : "0 -30vh",
                    mt: isMobile ? 20 : 10, 
                    borderRadius: "1rem", 
                    border: "1px solid ".concat(COLORS.accent), 
                    p: isMobile ? 4 : 5, 
                    width: isMobile ? "80%" : "95%", 
                    background: COLORS.accentOpaco,
                    gap: isMobile ? 3 : 0,
                    mx: isMobile ? 1 : 0
                }}>
                    <TiltedCard
                        imageSrc={boi}
                        altText="Za Za Za Sahur - $ZZZZSHR"
                        captionText="Za Za Za Sahur - $ZZZZSHR"
                        containerHeight={isMobile ? (isSmallMobile ? "250px" : "300px") : "350px"}
                        containerWidth={isMobile ? (isSmallMobile ? "250px" : "300px") : "350px"}
                        imageHeight={isMobile ? (isSmallMobile ? "250px" : "300px") : "350px"}
                        imageWidth={isMobile ? (isSmallMobile ? "250px" : "300px") : "350px"}
                        rotateAmplitude={12}
                        scaleOnHover={isMobile ? 1.05 : 1.2}
                        showMobileWarning={false}
                        showTooltip={!isMobile}
                        displayOverlayContent={true}
                        overlayContent={
                            <p className="tilted-card-demo-text" style={{
                                fontFamily: '"Bitcount Grid Double", system-ui',
                                fontWeight: 400,
                                fontOpticalSizing: 'auto',
                                fontSize: isMobile ? (isSmallMobile ? "16px" : "18px") : "20px",
                                fontVariationSettings: '"slnt" 0, "CRSV" 0.5, "ELSH" 0, "ELXP" 0',
                            }}>
                                $ZZZZSHR
                            </p>
                        }
                    />
                    <Box 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="space-evenly" 
                        flexDirection="column"
                        width={isMobile ? "100%" : "auto"}
                        sx={{ ml: isMobile ? 0 : 5 }}
                    >
                        <Paper elevation={12} sx={{ 
                            p: isMobile ? 1.5 : 2, 
                            px: isMobile ? 2 : 3, 
                            borderRadius: "1rem", 
                            fontFamily: "Courgette, cursive", 
                            background: "rgba(255, 255, 255, 0.08)",
                            width: isMobile ? "100%" : "auto",
                            maxWidth: isMobile ? "100%" : "none"
                        }}>
                            <Box sx={{ 
                                fontSize: isMobile ? (isSmallMobile ? "12px" : "14px") : "16px",
                                lineHeight: isMobile ? 1.4 : 1.6
                            }}>
                                <ShinyText 
                                    text='"Za Za Za Sahur is not sleeping. He is just really, really high. $ZZZZSHR is the meme coin that forgot it was a coin. Early-stage. Ultra-undervalued. Possibly hallucinating. While other tokens are grinding charts, Sahur is floating through astral planes, whispering all his gains."' 
                                    speed={3} 
                                />
                            </Box>
                            <Box sx={{ 
                                fontSize: isMobile ? (isSmallMobile ? "14px" : "16px") : "18px",
                                mt: 2,
                                fontWeight: 'bold'
                            }}>
                                <ShinyText text="The socials:" speed={3} />
                            </Box>
                        </Paper>
                        
                        <Box 
                            display="flex" 
                            alignItems="center" 
                            justifyContent="space-evenly" 
                            width="100%" 
                            mt={isMobile ? 3 : 5}
                            flexWrap={isSmallMobile ? "wrap" : "nowrap"}
                            gap={isMobile ? 1 : 2}
                        >
                            {[
                                <Link to="https://x.com/CommunyTrip" key="twitter"> 
                                    <Twitter sx={{ 
                                        height: isMobile ? (isSmallMobile ? "35px" : "40px") : "50px", 
                                        width: isMobile ? (isSmallMobile ? "35px" : "40px") : "50px", 
                                        color: COLORS.accent 
                                    }} />
                                </Link>, 
                                <Link to="https://pump.fun/coin/HmQu37wPWCPMGgi3PNjufk7gMiPo9WSwhuRGaU8tpump" key="pump">
                                    <img 
                                        src={PumpFun} 
                                        height={isMobile ? (isSmallMobile ? "35px" : "40px") : "50px"} 
                                        width={isMobile ? (isSmallMobile ? "35px" : "40px") : "50px"} 
                                        alt="PumpFun"
                                    />
                                </Link>, 
                                <Link to="https://t.co/naRrXPxgQg" key="telegram"> 
                                    <Telegram sx={{ 
                                        height: isMobile ? (isSmallMobile ? "35px" : "40px") : "50px", 
                                        width: isMobile ? (isSmallMobile ? "35px" : "40px") : "50px", 
                                        color: COLORS.accent 
                                    }} />
                                </Link>, 
                                <Link to="https://www.mexc.com/dex/pumpfun-mexc?ca=HmQu37wPWCPMGgi3PNjufk7gMiPo9WSwhuRGaU8tpump&currency=SOL" key="mexc">
                                    <img 
                                        src={mexc} 
                                        height={isMobile ? (isSmallMobile ? "35px" : "40px") : "50px"} 
                                        width={isMobile ? (isSmallMobile ? "35px" : "40px") : "50px"} 
                                        alt="MEXC"
                                    />
                                </Link>
                            ].map((el, index) => (
                                <Box 
                                    key={index}
                                    sx={{ 
                                        border: "1px solid ".concat(COLORS.accent), 
                                        p: isMobile ? 0.5 : 1, 
                                        transition: "scale .2s linear", 
                                        borderRadius: ".8rem", 
                                        "&:hover": { scale: isMobile ? "1.05" : "1.1" },
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        minWidth: isMobile ? (isSmallMobile ? "45px" : "50px") : "60px",
                                        minHeight: isMobile ? (isSmallMobile ? "45px" : "50px") : "60px"
                                    }}
                                >
                                    {el}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </motion.div>
        </>
    )
}

export default ZaZaCard