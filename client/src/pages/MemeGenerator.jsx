import React, { useState } from 'react';
import {
    Container,
    CssBaseline,
    CircularProgress,
    Alert,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Chip,
    Tooltip,
    IconButton,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import { COLORS } from '../App';

function MemeGenerator() {
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [keywordInput, setKeywordInput] = useState('');

    const [imageUrl, setImageUrl] = useState('');
    const [promptUsed, setPromptUsed] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleKeywordKeyDown = (e) => {
        if (e.key === 'Enter' && keywordInput.trim()) {
            e.preventDefault();
            if (!keywords.includes(keywordInput.trim())) {
                setKeywords([...keywords, keywordInput.trim()]);
            }
            setKeywordInput('');
        }
    };

    const handleDeleteKeyword = (k) => {
        setKeywords(keywords.filter((kw) => kw !== k));
    };

    const generateMeme = async () => {
        if (!topic.trim()) return;

        setLoading(true);
        setError(null);
        setImageUrl('');
        setPromptUsed('');

        try {
            const response = await fetch(`https://zazaza-7.onrender.com/meme-generator/`, {
                method: 'POST',
                credentials:"include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic,
                    keywords,
                }),
            });

            if (!response.ok) throw new Error('Errore nella generazione del meme.');

            const data = await response.json();
            setImageUrl(data.image_url);
            setPromptUsed(data.prompt_used);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <Helmet>
                <title>Generatore di Meme Virali</title>
                <meta name="description" content="Crea meme virali, ironici e perfetti per i social." />
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
                            Genera Meme Virali
                        </Typography>

                        <Typography variant="body1" gutterBottom sx={{ mb: 3 }} color={COLORS.subtext}>
                            Inserisci un argomento e delle parole chiave. L&apos;IA genererà un&apos;immagine virale con testo.
                        </Typography>

                        <TextField
                            fullWidth
                            label="Argomento"
                            variant="outlined"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            InputLabelProps={{ style: { color: COLORS.subtext } }}
                            InputProps={{ style: { color: COLORS.text } }}
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
                            label="Aggiungi keyword (premi Invio)"
                            variant="outlined"
                            value={keywordInput}
                            onChange={(e) => setKeywordInput(e.target.value)}
                            onKeyDown={handleKeywordKeyDown}
                            InputLabelProps={{ style: { color: COLORS.subtext } }}
                            InputProps={{ style: { color: COLORS.text } }}
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

                        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {keywords.map((keyword, index) => (
                                <Chip
                                    key={index}
                                    label={keyword}
                                    onDelete={() => handleDeleteKeyword(keyword)}
                                    sx={{ background: COLORS.accent, color: COLORS.background }}
                                />
                            ))}
                        </Box>

                        <Button
                            variant="contained"
                            sx={{ background: COLORS.accent, color: COLORS.background, fontWeight: 'bold' }}
                            endIcon={<AutoAwesomeIcon />}
                            fullWidth
                            size="large"
                            onClick={generateMeme}
                            disabled={loading}
                        >
                            {loading ? 'Generazione...' : 'Genera Meme'}
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

                        {imageUrl && (
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="subtitle2" gutterBottom sx={{ color: COLORS.subtext }}>
                                    Meme generato:
                                </Typography>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        mt: 2,
                                        display: 'inline-block',
                                        textAlign: 'center',
                                    }}
                                >
                                    <img
                                        src={imageUrl}
                                        alt="Meme generato"
                                        style={{ maxWidth: '100%', borderRadius: 12 }}
                                    />
                                    <Tooltip title="Scarica">
                                        <a href={imageUrl} download={'Meme-' + topic}>
                                            <IconButton
                                                sx={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    backgroundColor: COLORS.background,
                                                    color: COLORS.text,
                                                    '&:hover': {
                                                        backgroundColor: COLORS.accent,
                                                        color: COLORS.background,
                                                    },
                                                }}
                                            >
                                                <DownloadIcon />
                                            </IconButton>
                                        </a>
                                    </Tooltip>
                                </Box>

                                <Typography variant="caption" sx={{ color: COLORS.subtext, mt: 2, display: 'block' }}>
                                    Prompt usato: {promptUsed}
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Container>
            </Box>
        </>
    );
}

export default MemeGenerator;
