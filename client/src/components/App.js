import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from "./NavBar";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {

    const [players, setPlayers] = useState([])
    const [tournaments, setTournaments] = useState([])
    const [registrations, setRegistrations] = useState([])

    useEffect(() => {
        fetch('/players')
        .then(res => res.json())
        .then(data => setPlayers(data))
    }, [players.registrations])

    useEffect(() => {
        fetch('/tournaments')
        .then(res => res.json())
        .then(data => setTournaments(data))
    }, [])

    useEffect(() => {
        fetch('/registrations')
        .then(res => res.json())
        .then(data => setRegistrations(data))
    }, [players.registrations])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NavBar />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Outlet context={{players, setPlayers, tournaments, setTournaments, registrations, setRegistrations}} />
        </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App;
