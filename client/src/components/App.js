import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Outlet context={{players, setPlayers, tournaments, setTournaments, registrations, setRegistrations}} />
    </LocalizationProvider>
  )
}

export default App;
