import React, { useState } from 'react';
import {
    Container,
    CssBaseline,
    CircularProgress,
    Alert,
    Box,
    AppBar,
    Toolbar,
    Typography,
    TextField,
    Button,
    Paper,
    IconButton,
    Avatar,
    Tooltip,
    Chip,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import MenuIcon from '@mui/icons-material/Menu';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import palettes from '../palettes'; // Palette colori personalizzate
import { COLORS } from '../App';
import Navbar from '../components/Navbar';



function TweetsGenerator() {
    const [topic, setTopic] = useState('');
    const [count, setCount] = useState(5);

    // Gestione keywords come array di stringhe e input temporaneo
    const [keywords, setKeywords] = useState([]);
    const [keywordInput, setKeywordInput] = useState('');

    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Aggiungi keyword premendo Invio
    const handleKeywordKeyDown = (e) => {
        if (e.key === 'Enter' && keywordInput.trim()) {
            e.preventDefault();
            if (!keywords.includes(keywordInput.trim())) {
                setKeywords([...keywords, keywordInput.trim()]);
            }
            setKeywordInput('');
        }
    };

    // Rimuovi keyword cliccando sulla X della Chip
    const handleDeleteKeyword = (keywordToDelete) => {
        setKeywords(keywords.filter((k) => k !== keywordToDelete));
    };

    const generateTweet = async () => {
        if (!topic.trim()) return;

        setLoading(true);
        setTweets([]);
        setError(null);

        try {
            const response = await fetch('https://zazaza-5.onrender.com/tweets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic,
                    count,
                    keywords, // invio array direttamente
                }),
            });

            if (!response.ok) throw new Error('Errore nella generazione dei tweet.');

            const data = await response.json();
            setTweets(data.tweets);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const openTweetComposer = (tweetText) => {
        const cleanedText = String(tweetText).replace(/['"]/g, '');
        const url = `https://x.com/compose/tweet?text=${encodeURIComponent(cleanedText)}`;
        window.open(url);
    };


    return (
        <>
            <Navbar />
            <Helmet>
                <title>Generatore di Tweet Virali</title>
                <meta
                    name="description"
                    content="Crea tweet virali, ironici e professionali in un click."
                />
            </Helmet>

            <CssBaseline />

            <Box
                sx={{
                    backgroundColor: COLORS.background,
                    minHeight: '100vh',
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    py: 6,
                }}
            >
                <Container maxWidth="md">
                    <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: COLORS.black }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: COLORS.accent }}>
                            Genera Tweet Virali
                        </Typography>

                        <Typography variant="body1" gutterBottom sx={{ mb: 3 }} color={COLORS.subtext}>
                            Inserisci un argomento, scegli quante frasi generare e opzionalmente inserisci delle parole chiave.
                        </Typography>

                        <TextField
                            fullWidth
                            label="Argomento"
                            variant="outlined"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            InputLabelProps={{ style: { color: COLORS.subtext } }}
                            InputProps={{
                                style: {
                                    color: COLORS.text,
                                    borderColor: COLORS.subtext,
                                },
                            }}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: COLORS.subtext,
                                    },
                                    '&:hover fieldset': {
                                        borderColor: COLORS.accent,
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: COLORS.accent,
                                    },
                                },
                            }}
                        />


                        <TextField
                            fullWidth
                            label="Numero di tweet"
                            type="number"
                            inputProps={{ min: 1, max: 20 }}
                            variant="outlined"
                            value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                            InputLabelProps={{ style: { color: COLORS.subtext } }}
                            InputProps={{
                                style: {
                                    color: COLORS.text,
                                },
                            }}
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: COLORS.subtext,
                                    },
                                    '&:hover fieldset': {
                                        borderColor: COLORS.accent,
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: COLORS.accent,
                                    },
                                },
                            }}
                        />


                        {/* Input keywords con aggiunta e visualizzazione chips */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Aggiungi keyword (premi Invio)"
                                variant="outlined"
                                value={keywordInput}
                                onChange={(e) => setKeywordInput(e.target.value)}
                                onKeyDown={handleKeywordKeyDown}
                                InputLabelProps={{ style: { color: COLORS.subtext } }}
                                InputProps={{
                                    style: {
                                        color: COLORS.text,
                                    },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: COLORS.subtext,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: COLORS.accent,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: COLORS.accent,
                                        },
                                    },
                                }}
                            />

                            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {keywords.map((keyword, index) => (
                                    <Chip
                                        key={index}
                                        label={keyword}
                                        onDelete={() => handleDeleteKeyword(keyword)}
                                        color={COLORS.accent}
                                        sx={{ background: COLORS.accent, mt: 2 }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        <Button
                            variant="contained"
                            sx={{ background: COLORS.accent, color: COLORS.background, fontWeight: "bolder" }}
                            endIcon={<AutoAwesomeIcon />}
                            fullWidth
                            size="large"
                            onClick={generateTweet}
                            disabled={loading}
                        >
                            {loading ? 'Generazione in corso...' : 'Genera Tweet'}
                        </Button>

                        {loading && (
                            <Box sx={{ mt: 3, textAlign: 'center' }}>
                                <CircularProgress />
                            </Box>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mt: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {tweets.length > 0 && (
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="subtitle2" gutterBottom sx={{ color: COLORS.subtext,mb:2 }}>
                                    Tweet generati (clicca per pubblicare su X):
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                        gap: 2,
                                    }}
                                >
                                    {tweets.map((t, index) => (
                                        <Paper
                                            key={index}
                                            sx={{
                                                p: 2,
                                                backgroundColor: COLORS.accent,
                                                borderRadius: 2,
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s',
                                                '&:hover': { backgroundColor: COLORS.primary, color: '#fff' },
                                            }}
                                            onClick={() => openTweetComposer(t.tweet)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') openTweetComposer(t.tweet);
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {index + 1}. {t.tweet.replace(/^"(.*)"$/, '$1')}
                                            </Typography>
                                        </Paper>
                                    ))}
                                </Box>
                            </Box>
                        )}

                    </Paper>

                    <Box sx={{ mt: 6, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            © 2025 ViralTweet AI – Tutti i diritti riservati.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default TweetsGenerator