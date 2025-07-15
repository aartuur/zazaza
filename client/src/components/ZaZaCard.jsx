import React, { useRef } from 'react'
import { motion } from "framer-motion";
import { Box, Paper } from '@mui/material';
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
    
    return (
        <>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: "-20vw" }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: .5 }}
            >
                <Box sx={{ textAlign: 'center', display: "flex", alignItems: "center", justifyContent: "space-between", translate: "0 -30vh", mt: 10, borderRadius: "1rem", border: "1px solid ".concat(COLORS.accent), p: 4, width: "95%", background: COLORS.accentOpaco }}>
                    <TiltedCard
                        imageSrc={boi}
                        altText="Za Za Za Sahur - $ZZZZSHR"
                        captionText="Za Za Za Sahur - $ZZZZSHR"
                        containerHeight="350px"
                        containerWidth="350px"
                        imageHeight="350px"
                        imageWidth="350px"
                        rotateAmplitude={12}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={true}
                        displayOverlayContent={true}
                        overlayContent={
                            <p className="tilted-card-demo-text" style={{
                                fontFamily: '"Bitcount Grid Double", system-ui',
                                fontWeight: 400, // o 100–900
                                fontOpticalSizing: 'auto',
                                fontSize: "20px",
                                fontVariationSettings: '"slnt" 0, "CRSV" 0.5, "ELSH" 0, "ELXP" 0',
                            }}>
                                $ZZZZSHR
                            </p>
                        }
                    />
                    <Box display="flex" alignItems="center" justifyContent="space-evenly" flexDirection="column">
                        <Paper elevation={12} sx={{ p: 2, px: 3, borderRadius: "1rem", fontFamily: "Courgette, cursive", ml: 5, background: "rgba(255, 255, 255, 0.08)" }}>
                            <ShinyText text='"Za Za Za Sahur is not sleeping.He’s just really, really high.
                $ZZZZSHR is the meme coin that forgot it was a coin.Early-stage.Ultra-undervalued. Possibly hallucinating.
                While other tokens are grinding charts,Sahur is floating through astral planes,whispering all his gains."' speed={3} />
                            <ShinyText text="The socials:" speed={3} />
                        </Paper>
                        <Box display="flex" alignItems="center" justifyContent="space-evenly" width="100%" mt={5}>
                            {[<Link to="https://x.com/CommunyTrip" > <Twitter sx={{ height: "50px", width: "50px", color: COLORS.accent }} /></Link>, <Link to="https://pump.fun/coin/HmQu37wPWCPMGgi3PNjufk7gMiPo9WSwhuRGaU8tpump"><img src={PumpFun} height="50px" width="50px" /></Link>, <Link to="https://t.co/naRrXPxgQg"> <Telegram sx={{ height: "50px", width: "50px", color: COLORS.accent }} /></Link>, <Link to="https://www.mexc.com/dex/pumpfun-mexc?ca=HmQu37wPWCPMGgi3PNjufk7gMiPo9WSwhuRGaU8tpump&currency=SOL"><img src={mexc} height="50px" width="50px" /></Link>].map(el => (
                                <Box sx={{ border: "1px solid ".concat(COLORS.accent), p: 1, transition: "scale .2s linear", borderRadius: ".8rem", "&:hover": { scale: "1.1" } }}>
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
