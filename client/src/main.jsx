import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@emotion/react'
import theme from './theme.js'
import { CssBaseline } from '@mui/material'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import TweetsGenerator from './pages/TweetsGenerator.jsx'
import MemeGenerator from './pages/MemeGenerator.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/tweet-generator" element={<TweetsGenerator />} />
          <Route path="/meme-generator" element={<MemeGenerator />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
